import { useEffect, useRef, useState } from "react";

const useFetchManager = (url, params, method) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { current: param } = useRef(params);

  useEffect(() => {
    const getData = async () => {
      if (method === 'POST') {
        const fetchResult = await fetch(url, {
          method: method,
          body: JSON.stringify(param),
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if(fetchResult.status !== 200) {
          setError('Bad Request')
        } else {
          setData(true)
        }
    
      } else if(method === 'GET') {
        const par = new URLSearchParams(param)
        
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
          setData(d)
        }
      } else {
        setError('Only POST and GET supported!')
      }
    }

    try {
      getData()
    } catch(err) {
      setError(err)
      console.error(err)
    }

  }, [url, method, param])
  
  return {
    isHandlingRequest: !data && !error, 
    data: data,
    error: error
  }
}

export default useFetchManager;