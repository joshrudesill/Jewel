import { useRouter } from 'next/router'
import { useState } from 'react'

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

  const handleSelectChange = e => {
    const { target } = e;
    setAcType(target.value)
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
    <form>
    <h1>log</h1>
    <input
      name="email"
      placeholder="Enter email"
      value={email}
      onChange={handleInputChange}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Enter password"
      value={password}
      onChange={handleInputChange}
      required
    />
    <select value={acType} onChange={handleSelectChange}>
      <option value='admin'>Admin</option>
      <option value='standard'>Standard</option>
    </select>
  </form>
  {
    verified
  }
  <button onClick={() => onSubmit()}>Submit</button>
  <button onClick={() => register()}>Register</button>
  <button onClick={() => verifyAuth()}>verify</button>
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