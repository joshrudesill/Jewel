import { useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";

const CreatorNavBar = ({ creator })  => {
    const [showMenu, setShowMenu] = useState(false)
    
    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand">
                <span className="icon-text p-3">
                    <span className="icon">
                        <span className="icon mr-3 has-text-dark"><ion-icon size='large' name="diamond-outline"></ion-icon></span>
                    </span>
                    <span className="is-size-3 has-text-weight-light has-text-dark">Jewel</span>
                </span>
                <a role="button" className={`navbar-burger ${showMenu ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setShowMenu(!showMenu)}>
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
                </div>
                <div className="navbar-end">
                    <a className="navbar-item" target='_blank'>
                        Blog
                    </a>
                    <a className="navbar-item" target='_blank' href="github.com/joshrudesill/jewel">
                        GitHub
                    </a>
                    
                </div>
            </div>
        </nav>
    )
}


export default CreatorNavBar;