import { useState } from "react";


const CreatorNavBar = () => {
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
                    <a className="navbar-item">
                        Creator
                    </a>
                    <a className="navbar-item">
                        Manager
                    </a>
                </div>
                <div className="navbar-end">
                    <a className="navbar-item">
                        Blog
                    </a>
                    <a className="navbar-item">
                        GitHub
                    </a>
                </div>
            </div>
        </nav>
    )
}


export default CreatorNavBar;