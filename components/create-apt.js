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
    const fm = useFetchManager('/api/createapt', { watchFields, tz: tz, username: username }, 'POST', false)
    const [show,  setShow] = useState(false)
    const [lockDuration, setLockDuration] = useState(false)
    const [typeIndex, setTypeIndex] = useState()
    useEffect(() => {
        if(!fm.isHandlingRequest) {
            if (fm.status === 201) {
                router.reload();
            } else if(fm.status === 400) {
                reset()
                alert('Failed to create Appointment')
            } else if(fm.status === 401) {
                reset()
                alert('Conflicting Appointment: Failed to create')
            } else if(fm.status === 403) {
                reset()
                alert('You are not authorized to make this request')
            }
        }
    }, [fm.status, fm.isHandlingRequest])
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
        <div className="card mt-5" >
            <div className="card-content has-text-weight-medium p-3">
                <div className="columns is-clickable is-unselectable" onClick={() => setShow(!show)}>
                    <div className="column has-background-success-light">
                        <span>Create Appointment <span className="has-text-weight-light">{`${!show ? 'Click to expand' : ''}`}</span></span>
                    </div>
                </div>
                <form onSubmit={handleSubmit(fm.execute)} className={`${!show ? 'is-hidden' : '' }`}>
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
                            <div className="control">
                                <div className='select is-small is-rounded is-fullwidth' >
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
                            <label className="label is-size-7">Time {errors.hour?.message ? <span className="has-text-danger">({errors.hour?.message})</span> : ''}</label>
                            <div className="control">
                            <div className="select is-small is-rounded is-fullwidth" type="text" placeholder="Day">
                                    <TimeOptions value={watchFields.time} reg={register} setvalue={setValue}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label is-size-7">Duration (minutes) {errors.duration?.message ? <span className="has-text-danger">({errors.duration?.message})</span> : ''}</label>
                    <div className="control">
                    <input className="input is-small is-rounded" type="text" placeholder="15 min" disabled={lockDuration}
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
                            <label className="label is-size-7">
                                Type
                            </label>
                            <div className="control">
                                <div className="select is-small is-fullwidth is-rounded">
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
                <div className="columns">
                    <div className="column">
                        <button className="button is-rounded is-small is-primary" type="submit">{fm.isHandlingRequest ? 'Loading..' : 'Save'}</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}



export default CreateAppointment;