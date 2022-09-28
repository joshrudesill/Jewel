import { useCallback, useEffect, useRef, useState } from "react";
import isDeepEqual from 'fast-deep-equal/react';

const useFetchManager = (url, params, method, immediate = true) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isHandlingRequest, setIsHandlingRequest] = useState(false)
  const pRef = useRef(params);
  if (!isDeepEqual(pRef.current, params)) {
    pRef.current = params
  }
  const reset = () => {
    setData(null)
    setStatus(null)
    setError(null)
  }
  
  const execute = useCallback(() => {
    const getData = async () => {
      console.log('getdata')
      console.log(url)
      setIsHandlingRequest(true)
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
          setIsHandlingRequest(false)
          setError('Bad Request')
          setStatus(fetchResult.status)
        } else {
          setIsHandlingRequest(false)
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
          setIsHandlingRequest(false)
          setError('Bad Request')
        } else {
          const d = await fetchResult.json()
          setStatus(fetchResult.status)
          setData(d)
          setIsHandlingRequest(false)
        }
      } else {
        setIsHandlingRequest(false)
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
        setError('Undefined params')
        console.error(err)
      }
    } else {
      console.log('Params: ', checkUndefinedParams())
      console.log('URL: ', url)
    }
  }, [url, method, pRef.current])

  useEffect(() => {
    if(immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    isHandlingRequest: isHandlingRequest, 
    data: data,
    status: status,
    error: error,
    execute: execute,
    reset: reset
  }
}

export default useFetchManager;