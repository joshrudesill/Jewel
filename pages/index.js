import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acType, setAcType] = useState('standard')
  const [verified, setVerified] = useState('not checked')
  const router = useRouter();
  const handleInputChange = e => {
    const { value, name } = e.target;
    if (name === 'email') {
        setEmail(value)
    } else {
        setPassword(value)
    }
  }

  const onSubmit = async () => {
    const user = await fetch('/api/login', {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify({
        username: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const ud = await user.json()
    console.log(ud)
    if(ud.act === 'admin') {
      router.push(`/creator/${ud.username}`)
    } else {
      router.push(`/user/${ud.username}`)
    }
  }

  const register = async () => {
    const user = await fetch('/api/register', {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify({
        username: email,
        password: password,
        accountType: acType
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const verifyAuth = async () => {
    const verify = await fetch('/api/verifyAuth', {
      method: 'POST',
      withCredentials: true,
      body: JSON.stringify({
        username: email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(verify.status === 200) {
      setVerified('Verified')
    } else {
      setVerified('Not verified')
    }
  }
  return (
  <>
  <div className="container">
        <div className="columns mt-5">
            <div className="column is-half is-offset-one-quarter border">
                <div className="is-size-2 mb-4 has-text-weight-semibold">
                    Log In
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="field">
                            <label className="label">Username or Email</label>
                            <div className="control has-icons-left">
                                <input 
                                  name='email'
                                  className="input" 
                                  type="text" 
                                  placeholder="e.g. JohnDoe@example.com" 
                                  onChange={handleInputChange}
                                  value={email}
                                  required
                                  >
                                    
                                </input>
                                <span className="icon has-text-primary is-left">
                                    <ion-icon size="small" name="mail-outline"></ion-icon>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input 
                                      className="input" 
                                      type="password"
                                      name='password' 
                                      placeholder="******"
                                      value={password}
                                      onChange={handleInputChange}
                                      required
                                      >
                                    </input>
                                    <span className="icon has-text-primary is-left">
                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                    </span>
                                </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a onClick={onSubmit} className="card-footer-item has-text-dark has-background-success-light">Log in</a>
                        <Link href='/register'>
                          <a className="card-footer-item has-text-dark ">Sign Up</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    </>
  )
}
export async function getServerSideProps() {
  return {
    props: {
      p: ''
    }
  }
}