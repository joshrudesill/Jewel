import { useState } from "react";
import AptDate from "./apt-date";
import UserAptModal from "./user-apt-modal";
const dayjs = require('dayjs');

const SchedApt = ({ a, type }) => {
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
        <div className="column is-one-quarter-desktop is-half-tablet">
            <div className="card">
                <div className="card-header">
                    
                        <span className="card-header-icon is-size-4">
                            <ion-icon name="calendar-number-outline"></ion-icon>
                        </span>
                        <span className="card-header-title has-text-weight-light is-size-5"><AptDate startTime={a.startTime} endTime={a.endTime}/></span>
                </div>
                <div className="columns mt-3 p-2 is-mobile">
                    <div className="column">
                        {
                            type ? 
                            <div className="control">
                                <div className="tags has-addons" >
                                    <span className="tag is-dark" data-tooltip='Type desc'>Type</span>
                                    <span className="tag is-danger" data-tooltip='Type desc'>{type.typeName}</span>
                                </div>
                            </div>
                            : <></>
                        } 
                    </div>
                    <div className="column is-narrow">
                        <button className="button is-primary is-rounded" onClick={() => setActive(true)}>
                            <span className="icon-text">
                                <span className="icon">
                                    <ion-icon name="calendar-number-outline"></ion-icon>
                                </span>
                                <span>Book</span>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="card-footer has-background-dark">
                        <div className="card-footer-item"></div>
                </div>
            </div>
        </div>
        { active ? <UserAptModal active={active} setactive={setActive} apt={a}/> : <></> }
        </>
    )
}  

export default SchedApt;