import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Footer from '../components/footer'

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)
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
                <span className='card-header-title is-size-2 has-text-weight-light'>Welcome to Jewel</span>
              </div>
              <div className='card-content'>
                <div className='content '>
                  <h3>What is the purpose of this project?</h3>
                  <p>
                    What you're about to use is a portfolio project built by me, Josh Rudesill (an aspiring web dev). The name Jewel comes from the word 'Sche<strong>dule</strong>'.. get it? Sched-Jewel. 
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
                    <li></li>
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