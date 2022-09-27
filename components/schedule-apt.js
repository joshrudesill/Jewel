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
            <div className="card" style={{border: '1px solid rgb(209, 209, 209)' }}>
                <div className="card-header is-shadowless" style={{borderBottom: '1px solid rgb(209, 209, 209)'}}>
                    <span className="card-header-icon is-size-4 pr-1">
                        <ion-icon name="calendar-number-outline"></ion-icon>
                    </span>
                    <span className="card-header-title has-text-weight-light is-size-5-desktop is-size-6-tablet p-1"><AptDate startTime={a.startTime} endTime={a.endTime}/></span>
                </div>
                <div className="columns  p-3 is-mobile">
                    <div className="column">
                        {
                            type ? 
                            <>
                            <div className="control">
                                <div className="tags has-addons" >
                                    <span className="tag is-dark" data-tooltip={type.typeDescription}>Type</span>
                                    <span className="tag is-danger">{type.typeName}</span>
                                </div>
                            </div>
                            <div className="control mt-1">
                                <div className="tags has-addons" >
                                    <span className="tag is-dark" >Price</span>
                                    <span className="tag is-warning">${type.price}</span>
                                </div>
                            </div>
                            </>
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
            </div>
        </div>
        { active ? <UserAptModal active={active} setactive={setActive} apt={a}/> : <></> }
        </>
    )
}  

export default SchedApt;