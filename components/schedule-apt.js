import { useState } from "react";
import AptDate from "./apt-date";
import UserAptModal from "./user-apt-modal";

const SchedApt = ({ a }) => {
    const [active, setActive] = useState(false)
    const bookApt = async () => {
        const apt = await fetch('/api/bookapt' ,{
            method: 'POST',
            withCredentials: true,
            body: JSON.stringify({
                aID: a.id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return (
        <>
        <div className="column is-one-quarter">
            <div className="card">
                <div className="card-content p-3">
                    <div className="columns">
                        <div className="column has-background-success-light">
                            <span><AptDate startTime={a.startTime} endTime={a.endTime}/></span>
                        </div>
                    </div>
                    <div className='columns'>
                        <div className='column'>
                            <span className="has-text-weight-bold">Time</span><br></br>
                            <AptDate startTime={a.startTime} endTime={a.endTime}/>
                        </div>
                        <div className='column has-text-right'>
                            <button className="button is-small" onClick={() => setActive(true)}>Book</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        { active ? <UserAptModal active={active} setactive={setActive} apt={a}/> : <></> }
        </>
    )
}  

export default SchedApt;