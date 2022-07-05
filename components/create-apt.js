import { useRouter } from "next/router";
import { useState } from "react";

const CreateAppointment = ({ username }) => {
    const [month, setMonth] = useState('June');
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [duration, setDuration] = useState(15);
    const router = useRouter();
    const changeVal = e => {
        const { name, value } = e.target;
        if(name === 'day') {
            setDay(value)
            return
        }
        else if(name === 'hour') {
            setHour(value)
            return
        }
        else if(name === 'minute') {
            setMinute(value)
            return
        }
        else if(name === 'duration') {
            setDuration(value)
            return
        }
        else if(name === 'month') {
            setMonth(value)
            return
        }
    }

    const createApt = async () => {
        const apt = await fetch('/api/createapt' ,{
            method: 'POST',
            withCredentials: true,
            body: JSON.stringify({
                day: day,
                hour: hour,
                minute: minute,
                duration: duration,
                month: 7,
                username: username
        }),
      headers: {
        'Content-Type': 'application/json'
      }
        });
        if (apt.status === 200) {
            router.reload();
        }
    }

    return (
        <div class="columns p-0">
                        <div class="column">
                            <div class="card mt-5">
                                <div class="card-content has-text-weight-medium p-3">
                                    <div class="columns">
                                        <div class="column is-narrow has-background-success-light">
                                            <span class="has-text-weight-medium is-size-5">Create<br></br> Appointment</span>
                                        </div>
                                        <div class="column is-narrow">
                                            <label class="label is-size-7 p-0">Month</label>
                                            <div class="select is-small is-rounded">
                                                <select name='month' value={month} onChange={changeVal}>
                                                    <option value='June'>June</option>
                                                    <option value='July'>July</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="column is-1">
                                            <label class="label is-size-7 p-0">Day</label>
                                            <input class="input is-small is-rounded" type="text" placeholder="Day" name='day'onChange={changeVal} value={day}></input>
                                        </div>
                                        <div class="column is-1">
                                            <label class="label is-size-7 p-0">Hour</label>
                                            <input class="input is-small is-rounded" type="text" placeholder="Hour" name="hour"onChange={changeVal} value={hour}></input>
                                        </div>
                                        <div class="column is-1">
                                            <label class="label is-size-7 p-0">Minute</label>
                                            <input class="input is-small is-rounded" type="text" placeholder="Min." name="minute"onChange={changeVal} value={minute}></input>
                                        </div>
                                        <div class="column is-1">
                                            <label class="label is-size-7 p-0">Duration</label>
                                            <input class="input is-small is-rounded" type="text" placeholder="Duration" name="duration"onChange={changeVal} value={duration}></input>
                                        </div>
                                        <div class="column is-narrow">
                                            <label class="label is-size-7 p-0">Type</label>
                                            <div class="select is-small is-rounded">
                                                <select>
                                                <option>Hair Cut</option>
                                                <option>With options</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="column has-text-right">
                                            <button class="button mt-2 is-link is-outlined is-rounded">Preview</button>
                                        </div>
                                        <div class="column is-narrow has-text-right">
                                            <button class="button mt-2 mr-2 is-info is-outlined is-light is-rounded" onClick={createApt}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}


export default CreateAppointment;