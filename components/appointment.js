import { useState } from "react";
import AptDate from "./apt-date";
import AptIcon from "./apt-icon";
import AptTime from "./apt-time";

const Appointment = ({ a, type }) => {
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
        <div className="column is-one-third-desktop is-half-tablet">
            <div className="card is-shadowless" style={{border: '1px solid rgb(209, 209, 209)' }}>
                <div className="card-header is-clickable is-unselectable is-shadowless" onClick={toggleShow}>
                    <div className="card-header-title">
                        <div className="icon-text">
                            <AptIcon startTime={a.startTime}/>
                            <span className="has-text-weight-medium"><AptDate startTime={a.startTime} endTime={a.endTime} /></span>
                        </div>
                    </div>
                    {
                        type ? 
                        <div className="card-header-icon pr-2">
                                <span className="tag is-success is-light is-medium">{type.typeName}</span>
                        </div>
                        :
                        <></>
                    }
                    {
                        a.userEmail !== null ?  
                        <div className="card-header-icon pr-3 pt-2 pb-3 pl-0">
                                <span className="icon is-size-5 is-medium"><ion-icon name="checkbox-outline"></ion-icon></span>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div className={`${show ? '' : 'is-hidden'} card-content`}>
                    <div className="content">
                        <div className="columns is-mobile is-multiline">
                            <div className="column is-narrow icon-text">
                                <span className="icon is-size-4 mr-3 has-text-success"><ion-icon name="cash-outline"></ion-icon></span>
                                <span className="has-text-weight-bold mr-2">Price:</span>
                                <span>{type ? type.price : <></>}</span>
                            </div>
                        
                            <div className="column is-narrow icon-text">
                                <span className="icon is-size-4 mr-3 has-text-success"><ion-icon name="person-outline"></ion-icon></span>
                                <span className="has-text-weight-bold mr-2">Claimed by:</span>
                                <span>{a.userEmail ? a.userEmail : 'Unclaimed'}</span>
                            </div>
                        </div>
                        {
                            a.message ? 
                                <div className="column">
                                    <div className="content">
                                        <span className="has-text-weight-medium">Message:</span>
                                        <p className="subtitle">{a.message}</p>
                                    </div>
                                </div>
                            : <></>
                        }
                        
                        <div className="columns">
                            <div className="column">
                                <AptTime start={a.startTime} end={a.endTime}/>
                            </div>
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