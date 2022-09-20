

const CreatorNavBar = () => {
    return (
        <nav className="navbar p-3">
            <div className="navbar-brand">
            <span className="icon-text p-3">
                <span className="icon">
                <span className="icon mr-3 has-text-dark"><ion-icon size='large' name="diamond-sharp"></ion-icon></span>
                </span>
                <span className="is-size-3 has-text-weight-light">Jewel</span>
            </span>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                    </a>

                </div>
            </div>
        </nav>
    )
}


export default CreatorNavBar;