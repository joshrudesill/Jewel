const Register = () => {
    return (
        <div className="container">
        <div className="columns mt-5">
            <div className="column is-half is-offset-one-quarter border">
                <div className="is-size-2 mb-4">
                    Register
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="field mb-4">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="text" placeholder="e.g. JohnDoe25"></input>
                                <span className="icon has-text-primary is-left">
                                    <ion-icon name="accessibility-outline"></ion-icon>
                                </span>
                                <span className="icon has-text-success is-right">
                                    <ion-icon name="thumbs-up-outline"></ion-icon>
                                </span>
                                <p className="help has-text-success">Username Available!</p>
                            </div>
                        </div>
                        <div className="field mb-4">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-danger" type="text" placeholder="e.g. JohnDoe@example.com"></input>
                                <span className="icon has-text-primary is-left">
                                    <ion-icon size="small" name="mail-outline"></ion-icon>
                                </span>
                                <span className="icon has-text-danger is-right">
                                    <ion-icon name="ban-outline"></ion-icon>
                                </span>
                                <p className="help has-text-danger">An account with this email already exists!</p>
                            </div>
                        </div>
                        <div className="field mb-4">
                            <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="******"></input>
                                    <span className="icon has-text-primary is-left">
                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                    </span>
                                    <span className="icon has-text-secondary is-right">
                                        <ion-icon name="eye-outline"></ion-icon>
                                    </span>
                                </div>
                        </div>
                        <div className="field mb-4">
                            <label className="label">Account Type</label>
                            <div className="control has-icons-left">
                              <div className="select">
                                <select>
                                  <option>Normal</option>
                                  <option>Creator</option>
                                </select>
                              </div>
                            <span className="icon has-text-primary is-left">
                                <ion-icon name="shield-half-outline"></ion-icon>
                            </span>
                            <p className="help has-text-grey">If you&apos;re booking an appointment normal is for you!</p>
                            </div>
                          </div>
                    </div>
                    <div className="card-footer">
                        <a href="#" className="card-footer-item ">Log in</a>
                        <a href="#" className="card-footer-item has-text-dark has-background-success-light">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register