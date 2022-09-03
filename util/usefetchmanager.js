import { useCallback, useEffect, useRef, useState } from "react";
import isDeepEqual from 'fast-deep-equal/react';

const useFetchManager = (url, params, method, immediate = true) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const pRef = useRef(params);
  if (!isDeepEqual(pRef.current, params)) {
    pRef.current = params
  }
  const execute = useCallback(() => {
    console.log('execute called')
    const getData = async () => {
      console.log('getdata called')
      setData(null)
      setError(null)
      setStatus(null)
      if (method === 'POST') {
        const fetchResult = await fetch(url, {
          method: method,
          body: JSON.stringify(pRef.current),
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if(fetchResult.status !== 200) {
          setError('Bad Request')
          setStatus(fetchResult.status)
        } else {
          setStatus(fetchResult.status)
          setData(true)
        }
    
      } else if(method === 'GET') {
        const par = new URLSearchParams(pRef.current)
        
        const parsedURL = url + '?' + par
        const fetchResult = await fetch(parsedURL, {
          method: method,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if(fetchResult.status !== 200) {
          setError('Bad Request')
        } else {
          const d = await fetchResult.json()
          setStatus(fetchResult.status)
          setData(d)
        }
      } else {
        setError('Only POST and GET supported!')
      }
    }

    const checkUndefinedParams = () => {
      const isDefined = v => typeof v !== 'undefined'
      const defined = Object.values(params).every(isDefined)
      return defined
    }

    if (checkUndefinedParams() && url !== undefined && method !== undefined) {
      try {
        getData()
      } catch(err) {
        setError(err)
        console.error(err)
      }
    }
  }, [url, method, pRef.current])

  useEffect(() => {
    if(immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    isHandlingRequest: !data && !error && !status, 
    data: data,
    status: null,
    error: error,
    execute: execute
  }
}

export default useFetchManager;