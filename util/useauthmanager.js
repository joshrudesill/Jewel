import { useEffect, useState } from "react";



const useAuthManager = (username, admin) => {
  const [awaitingAuth, setAwaitingAuth] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const uri = `/api/verifyAuth?username=${username}&admin=${admin}`
      const auth = await fetch(uri, {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (auth.status === 200) {
        setAwaitingAuth(false)
        setAuthorized(true)
      } else {
        setError('Unauthorized')
        setAwaitingAuth(false)
      }
    }
    if(typeof admin === 'boolean' && typeof username === 'string') {
      try {
        checkAuth()
      } catch(err) {
        setError(err)
        console.error(err)
      }
    } else {
      setError('Wrong parameter types!')
    }
  }, [username, admin])

  return {
    authorized: authorized,
    processingAuth: awaitingAuth,
    error: error
  }
}

export default useAuthManager;