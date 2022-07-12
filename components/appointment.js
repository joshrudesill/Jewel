import AptDate from "./apt-date";

const Appointment = ({ a }) => (
    <div className="columns mt-3">
        <div className="column">
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title">
                        <div className="icon-text">
                            <span className='icon'><ion-icon name="alert-outline" className="is-size-4 has-text-danger"></ion-icon></span>
                            <span>Haircut - Today, 3:30</span>
                        </div>
                    </div>
                    <div className="card-header-icon">
                        <div className="has-text-right">
                            <span className="tag is-success is-light is-medium"><ion-icon className='mr-1 is-size-5' name="stopwatch-outline"></ion-icon>30 min</span>
                        </div>
                    </div>
                </div>
                <div className="card-content">
                    <div className="columns">
                        <div className="column is-narrow icon-text">
                            <span className='icon'>
                                <ion-icon name="time-outline" className=" is-size-4 mr-2 has-text-success"></ion-icon>
                            </span>
                            <span className="has-text-weight-bold mr-2">Times:</span>
                            <AptDate startTime={a.startTime}/>
                        </div>
                        <div className="column is-narrow icon-text">
                            <span className="icon is-size-4 mr-3 has-text-success"><ion-icon name="cash-outline"></ion-icon></span>
                            <span className="has-text-weight-bold mr-2">Price:</span>
                            <span>$31.25</span>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-narrow icon-text">
                            <span className="icon is-size-4 mr-3 has-text-success"><ion-icon name="person-outline"></ion-icon></span>
                            <span className="has-text-weight-bold mr-2">Claimed by:</span>
                            <span>exampleUser123 <button className="button is-small ml-3 is-rounded">Message</button></span>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column has-text-right p-0">
                            <button className="button is-small is-danger is-rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)  

export default Appointment;