import AptDate from "./apt-date";
import AptTime from "./apt-time";

const Appointment = ({ a }) => (
    <div className="columns mt-1">
        <div className="column">
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title">
                        <div className="icon-text">
                            <span className='icon is-size-4 has-text-danger'><ion-icon name="alert-outline" ></ion-icon></span>
                            <span>Haircut - <AptDate startTime={a.startTime} endTime={a.endTime}/></span>
                        </div>
                    </div>
                    <AptTime start={a.startTime} end={a.endTime}/>
                </div>
                <div className="card-content">
                    <div className="columns">
                        <div className="column is-narrow icon-text">
                            <span className='icon'>
                                <ion-icon name="time-outline" className=" is-size-4 mr-2 has-text-success"></ion-icon>
                            </span>
                            <span className="has-text-weight-bold mr-2">Times:</span>
                            <AptDate startTime={a.startTime} endTime={a.endTime}/>
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