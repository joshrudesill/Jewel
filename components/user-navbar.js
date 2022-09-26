import { useState } from "react";
import Link from 'next/link'


const UserNavBar = ({ creator }) => {
    const [showMenu, setShowMenu] = useState(false)
    return (
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
                <div className="navbar-start">
                    <span className="navbar-item is-size-4 has-text-weight-light">
                        {creator}
                    </span>
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


export default UserNavBar;