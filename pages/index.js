import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '../components/footer'
import { useForm } from 'react-hook-form'
import useFetchManager from '../util/usefetchmanager'

export default function Home() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const { setValue, resetField, register, handleSubmit, formState: { errors }, reset, watch  } = useForm({ mode: 'onSubmit' })
  const watchFields = watch()
  const { data, execute, error, status, isHandlingRequest } = useFetchManager('/api/createtrialaccount', { watchFields }, 'POST', false)

  useEffect(() => {
    if(!isHandlingRequest && data && !error) {
      router.push(`/creator/${data}`)
    } 
  }, [data, status, isHandlingRequest])
/*
<button onClick={
      () => {
        fetch('/api/login?username=josh&password=asdf')
      }
    }>l</button>
 */
  return (
  <>
    
    <nav className="navbar is-primary">
      <div className="navbar-brand">
        <span className="is-unselectable icon-text p-3" >
            <span className="icon has-text-dark">
                <ion-icon size='large' name="diamond-outline"></ion-icon>
            </span>
            <span className="is-size-3 has-text-weight-light has-text-dark">Jewel</span>
        </span>

          <a role="button" className={`navbar-burger ${showMenu ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={() => setShowMenu(!showMenu)}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
      </div>
      <div className={`navbar-menu ${showMenu ? 'is-active' : ''}`}>

          <div className="navbar-end">
              <a className="navbar-item" target='_blank' rel="noreferrer">
                  Blog
              </a>
              <a className="navbar-item" target='_blank' href="https://github.com/joshrudesill/jewel" rel="noreferrer">
                  GitHub
              </a>

          </div>
      </div>
    </nav>
    
    <div className="container is-fullhd">
        <div className='columns is-centered mt-2'>
          <div className='column is-10'>
            <div className='card'>
              <div className='card-header is-shadowless'  style={{borderBottom: '1px solid rgb(209, 209, 209)'}}>
                <span className='p-5 is-size-3 has-text-weight-light icon-text'>
                  <span>Welcome to Jewel</span>
                  <span className='icon'><ion-icon className='is-size-1' size='large' name="diamond-outline"></ion-icon></span>
                </span>
              </div>
              <div className='card-content'>
                
                <div className='columns'>
                  <div className='column'>
                    <span className='is-size-5'>To get started, press the &apos;Start Trial&apos; button. This will create and log you in to an administrator test account for you with some fake appointments with fake users. I encourage you to view and filter through appointments, make a new schedule, 
                      and make a new appointment type.
                    </span>
                    <br/>
                    <br/>
                    <span className='is-size-5 has-text-weight-medium'>
                      Explore and enjoy
                    </span>
                  </div>
                  
                </div>
              <form onSubmit={handleSubmit(execute)}>
                <div className='columns'>
                  <div className='column'>
                    
                    <button className='button is-large is-primary' type='submit' disabled={isHandlingRequest}>Start Trial</button>
                  </div>
                  <div className='column is-5'>
                    <div className='control'> 
                      <label className='label'>Name (optional)</label>
                      <input className='input' {...register('name', { required: false, maxLength: 50 })}></input>
                    </div>
                  </div>
                </div>
              </form>
              </div>
            </div>
            <div className='card mt-5'>
                  <div className='card-content'>
                    <div className='content '>
                      <h3>What is the purpose of this project?</h3>
                      <p>
                        What you&apos;re about to use is a portfolio project built by me, Josh Rudesill (an aspiring web dev). The name Jewel comes from the word &apos;Sche<strong>dule</strong>&apos;.. get it? Sched-Jewel. 
                        It is built with React and Next.js with MySQL as a database paradigm. See <a className='has-text-link' target='_blank' href="https://github.com/joshrudesill/jewel" rel="noreferrer">GitHub </a>
                        for more technical information.
                      </p>
                      <p>It is built with a business owner in mind who needs to create and manage appointments and have their customers book times.</p>
                      <h3>Features</h3>
                      <h4>Admin</h4>
                      <ul>
                        <li>Create time-based non-conflicting appointments with ease</li>
                        <li>Create appointment types for easier schedule making and price / time management</li>
                        <li>Create a schedule with a break and have it be filled with appointments with the criteria of your choosing</li>
                        <li>Sort and filter through all appointments based on a number of criteria including claimed vs. unclaimed appointments, date, and type.</li>
                        <li>Account authentication system</li>
                      </ul>
                      <h4>User</h4>
                      <ul>
                        <li>Sort and filter appointments by date and type</li>
                        <li>Book appointments using email and optional message</li>
                        <li>Coming soon: Stripe payments upon booking (using test account) + email notifications for upcoming appointments</li>
                      </ul>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>
    <Footer />
    </>
  )
}