import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    const user = await fetch('/api/hello', {
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
    router.push('/')
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
  </form>
    <button onClick={() => onSubmit()}>Submt</button>
    </>
  )
}
const s = require('sequelize')
export async function getServerSideProps() {
  s
  return {
    props: {
      p: ''
    }
  }
}