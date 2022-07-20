import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import MonthOptions from "./month-options";
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
dayjs.extend(utc)
dayjs.extend(timezone)

const CreateAppointment = ({ username }) => {
    const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm({mode: 'onChange'});
    const router = useRouter();

    const createApt = async data => {
        const apt = await fetch('/api/createapt' ,{
            method: 'POST',
            withCredentials: true,
            body: JSON.stringify({
                day: data.day,
                hour: data.hour,
                minute: data.minute,
                duration: data.duration,
                month: data.month,
                username: username,
        }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (apt.status === 201) {
            router.reload();
        } else if(apt.status === 400) {
            reset()
            alert('Failed to create Appointment')
        } else if(apt.status === 401) {
            reset()
            alert('Conflicting Appointment: Failed to create')
        } else if(apt.status === 403) {
            reset()
            alert('You are not authorized to make this request')
        } 
    }

    return (
    <div className="card mt-5">
        <div className="card-content has-text-weight-medium p-3">
            <div className="columns">
                <div className="column has-background-success-light">
                    <span>Create Appointment</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(createApt)}>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label className="label is-size-7">Month</label>
                        <div className="control">
                            <div className="select is-small is-fullwidth is-rounded">
                                    <MonthOptions reg={register} setVal={setValue}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label is-size-7">Day {errors.day?.message ? <span className="has-text-danger">({errors.day?.message})</span> : ''}</label>
                         <div className="control has-icons-right">
                           <input className='input is-small is-rounded' type="text" placeholder="Day" required
                           {...register('day', 
                           { 
                                required: true, 
                                max: {
                                    value: 31,
                                    message: 'Too High'
                                }, 
                                min: {
                                    value: 1,
                                    message: 'Too Low'
                                }, 
                                valueAsNumber: true, 
                                validate: value => value > 0 || 'Must be a number'
                            } )}>
                            </input>
                         </div>
                    </div>
                </div>
            </div>
            
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label className="label is-size-7">Hour {errors.hour?.message ? <span className="has-text-danger">({errors.hour?.message})</span> : ''}</label>
                         <div className="control">
                           <input className="input is-small is-rounded" type="text" placeholder="Day" 
                           {...register('hour', 
                           { 
                                required: true, 
                                max: {
                                    value: 24,
                                    message: '0 to 23 only!'
                                }, 
                                min: {
                                    value: 1,
                                    message: '0 to 23 only!'
                                }, 
                                valueAsNumber: true, 
                                validate: value => value > 0 || 'Must be a number'
                            })}></input>
                         </div>
                    </div>
                </div>
                <div className="column">
                    <div className="field">
                        <label className="label is-size-7">Minute {errors.minute?.message ? <span className="has-text-danger">({errors.minute?.message})</span> : ''}</label>
                         <div className="control">
                           <input className="input is-small is-rounded" type="text" placeholder="Day" 
                           {...register('minute', 
                           { 
                                required: true, 
                                max: {
                                    value: 59,
                                    message: '1 to 59 only!'
                                }, 
                                min: {
                                    value: 1,
                                    message: '1 to 59 only!'
                                }, 
                                valueAsNumber: true, 
                                validate: value => value > 0 || 'Must be a number'
                            })}></input>
                         </div>
                    </div>
                </div>
            </div>
            <div className="field">
                <label className="label is-size-7">Duration (minutes) {errors.duration?.message ? <span className="has-text-danger">({errors.duration?.message})</span> : ''}</label>
                 <div className="control">
                   <input className="input is-small is-rounded" type="text" placeholder="Day" 
                   {...register('duration', 
                           { 
                                required: true, 
                                 
                                min: {
                                    value: 1,
                                    message: 'Greater than 1!'
                                }, 
                                valueAsNumber: true, 
                                validate: value => value > 0 || 'Must be a number'
                            })}></input>
                 </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label className="label is-size-7">Type</label>
                        <div className="control">
                            <div className="select is-small is-fullwidth is-rounded">
                                <select {...register('type')}>
                                    <option>Normal</option>
                                    <option>Creator</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <button className="button is-rounded is-small is-primary" type="submit">Save</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    )
}



export default CreateAppointment;