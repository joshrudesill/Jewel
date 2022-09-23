import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetchManager from "../util/usefetchmanager";
import DayOptions from "./day-options";
import MonthOptions from "./month-options";
import TimeOptions from "./timeoptions";
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
dayjs.extend(utc)
dayjs.extend(timezone)

const CreateAppointment = ({ username, types }) => {
    const { setValue, resetField, register, handleSubmit, formState: { errors }, reset, watch } = useForm({mode: 'onSubmit', defaultValues: { time: '9:00' }});
    const watchFields = watch()
    const tz = dayjs.tz.guess()
    const router = useRouter();
    const { isHandlingRequest, execute, status, error } = useFetchManager('/api/createapt', { watchFields, tz: tz, username: username }, 'POST', false)
    const [show,  setShow] = useState(false)
    const [lockDuration, setLockDuration] = useState(false)
    const [typeIndex, setTypeIndex] = useState()
    useEffect(() => {
        if(!isHandlingRequest) {
            if (status === 201) {
                router.reload();
            } else if(status === 400) {
                reset()
                alert('Failed to create Appointment')
            } else if(status === 401) {
                reset()
                alert('Conflicting Appointment: Failed to create')
            } else if(status === 403) {
                reset()
                alert('You are not authorized to make this request')
            }
        }
    }, [status, isHandlingRequest])
    useEffect(() => {
        if(parseInt(watchFields.type) === 0) {
            resetField('duration')
            setLockDuration(false)
        } else {
            if(types) {
                const typefound = types.findIndex(t => t.id === parseInt(watchFields.type))
                if(typefound !== -1) {
                    setTypeIndex(typefound)
                    setLockDuration(true)
                }
            }
        }
    }, [watchFields.type])

    useEffect(() => {
        if(types && lockDuration) {
            setValue('duration', types[typeIndex].defaultTime)
        }
    }, [typeIndex])

    return (
        <div className="columns is-centered">
            <div className="column is-8">
            <div className="columns">
                <div className="column">    
                    <div className={`notification is-shadowless has-background-primary p-3`}>
                        <span className="icon-text">
                            <span className="icon is-size-5"><ion-icon name="information-circle-outline"></ion-icon></span>
                        </span>
                        <button className="delete"></button>
                        <span>
                            Once submitted this will create an appointment on the desired month, day, and time. The duration is also required unless you select an appointment type in which case in will lock the duration
                            to the duration of the selected type.
                            <br/>
                            <span className="has-text-danger">Important: </span><span className="is-underlined"> If there are conflicting appointments within your criteria the appointment will not be created and you will be notified!</span>
                        </span>
                    </div>
                </div>

            </div>
                <div className="card mt-3" >
                    <div className="card-content has-text-weight-medium p-3">
                        <form onSubmit={handleSubmit(execute)}>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="icon-text is-size-5 mb-1">
                                        <span className="icon">
                                            <ion-icon name="calendar-outline"></ion-icon>
                                        </span>
                                        <span className="label">
                                            Month
                                        </span>
                                        
                                    </label>
                                    <div className="control">
                                        <div className="select is-fullwidth is-rounded">
                                                <MonthOptions reg={register} setVal={setValue}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="icon-text is-size-5 mb-1">
                                        <span className="icon">
                                            <ion-icon name="calendar-number-outline"></ion-icon>
                                        </span>
                                        <span className="label">
                                            Day
                                        </span>
                                        
                                    </label>
                                    <div className="control">
                                        <div className='select is-rounded is-fullwidth' >
                                            <select value={watchFields.day} required
                                                {...register('day', 
                                                    { 
                                                        required: true, 
                                                    } 
                                                )} >
                                                    <DayOptions month={watchFields.month} optionsOnly={true} day={watchFields.day} setValue={setValue}/>
                                                </select>
                                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                                
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="icon-text is-size-5 mb-1">
                                        <span className="icon">
                                            <ion-icon name="time-outline"></ion-icon>
                                        </span>
                                        <span className="label">
                                            Time
                                        </span>
                                        
                                    </label>
                                    <div className="control">
                                    <div className="select is-rounded is-fullwidth" type="text" placeholder="Day">
                                            <TimeOptions value={watchFields.time} reg={register} setvalue={setValue}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="icon-text is-size-5 mb-1">
                                <span className="icon">
                                    <ion-icon name="hourglass-outline"></ion-icon>
                                </span>
                                <span className="label">
                                    Duration {errors.duration?.message ? <span className="has-text-danger">({errors.duration?.message})</span> : ''}
                                </span>
                                
                            </label>
                        </div>
                        <div className="field has-addons has-addons-right">
                            <div className="control is-expanded">
                                <input className="input is-rounded " type="text" placeholder="15" disabled={lockDuration}
                                {...register('duration', 
                                        { 
                                                required: {
                                                    value: true,
                                                    message: 'Duration is required'
                                                }, 
                                                
                                                min: {
                                                    value: 1,
                                                    message: 'Greater than 1!'
                                                }, 
                                                valueAsNumber: true, 
                                                validate: value => value > 0 || 'Must be a number'
                                            })}></input>
                            </div>
                            <div className="control">
                                <a className="button is-static">
                                    Min.
                                </a>
                            </div>
                            
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="icon-text is-size-5 mb-1">
                                        <span className="icon">
                                            <ion-icon name="construct-outline"></ion-icon>
                                        </span>
                                        <span className="label">
                                            Type 
                                        </span>
                                        
                                    </label>
                                    <div className="control">
                                        <div className="select is-fullwidth is-rounded">
                                            <select {...register('type')} disabled={!types}>
                                                <option value='0'>Select Type</option>
                                                {
                                                    types ? Object.keys(types).map(t => {
                                                        return (
                                                            <option key={types[t].id} value={types[t].id}>{types[t].typeName}</option>
                                                        )
                                                    })
                                                    :
                                                    <></>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                        </div>
                        <button type='submit' className="button is-primary is-small card-footer-item mt-2" disabled={isHandlingRequest}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default CreateAppointment;