import { useState } from "react";
import Link from 'next/link'

const CreatorNavBar = ({ creator })  => {
    const [showMenu, setShowMenu] = useState(false)
    
    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand">
            <Link href={{
                      pathname: '/creator/[slug]',
                      query: { slug: creator },
                    }}>
                        <a className="icon-text p-3">
                            <a className="icon has-text-dark">
                                <ion-icon size='large' name="diamond-outline"></ion-icon>
                            </a>
                            <a className="is-size-3 has-text-weight-light has-text-dark">Jewel</a>
                        </a>
                    </Link>
                
                <a role="button" className={`navbar-burger ${showMenu ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={() => setShowMenu(!showMenu)}>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${showMenu ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <Link href={{
                      pathname: '/creator/[slug]',
                      query: { slug: creator },
                    }}>
                        <a className="navbar-item">
                            Appointments
                        </a>
                    </Link>
                    <Link href={{
                      pathname: '/creator/[slug]/manager',
                      query: { slug: creator },
                    }}>
                        <a className="navbar-item">
                            Manager
                        </a>
                    </Link>
                    <Link href={{
                      pathname: '/schedules/[slug]',
                      query: { slug: creator },
                    }}>
                        <a className="navbar-item">
                            View as User
                        </a>
                    </Link>
                </div>
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
    )
}


export default CreatorNavBar;