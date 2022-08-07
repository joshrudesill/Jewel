import { useState } from "react";
import AptDate from "./apt-date";
import AptIcon from "./apt-icon";
import AptTime from "./apt-time";

const Appointment = ({ a }) => {
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show)
    const [deleted, setDeleted] = useState(false);

    const onCancel = async () => {
        const apt = await fetch('/api/cancelapt', {
            method: 'POST',
            withCredentials: true,
            body: JSON.stringify({
                aptID: a.id,
                adminID: a.adminID
            }),
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        if(apt.status === 200) {
            setDeleted(true)
            alert('Successfully deleted')
        }
    }
    if (deleted) return null
    
    return (
    <div className='columns'>
        <div className="column">
            <div className="card">
                <div className="card-header" onClick={toggleShow}>
                    <div className="card-header-title">
                        <div className="icon-text">
                            <AptIcon startTime={a.startTime}/>
                            <span className="has-text-weight-medium"><AptDate startTime={a.startTime} endTime={a.endTime} /></span>
                        </div>
                    </div>
                    <AptTime start={a.startTime} end={a.endTime}/>
                </div>
                <div className={`${show ? '' : 'is-hidden'} card-content`}>
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
                            <span>{a.userEmail ? a.userEmail : 'Unclaimed'} {a.userEmail ? <button className="button is-small ml-3 is-rounded">Message</button> : null}</span>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column has-text-right p-0">
                            <button className="button is-small is-danger is-rounded" onClick={onCancel} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

export default Appointment;