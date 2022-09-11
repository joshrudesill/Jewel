import { useRouter } from "next/router";
import { useEffect } from "react";
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
    const { setValue, register, handleSubmit, formState: { errors }, reset, watch } = useForm({mode: 'onSubmit'});
    const watchFields = watch()
    const tz = dayjs.tz.guess()
    const router = useRouter();
    const fm = useFetchManager('/api/createapt', { watchFields, tz: tz, username: username }, 'POST', false)
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

    }, [watchFields.month])
    

    return (
    <div className="card mt-5">
        <div className="card-content has-text-weight-medium p-3">
            <div className="columns">
                <div className="column has-background-success-light">
                    <span>Create Appointment</span>
                </div>
            </div>
            <form onSubmit={handleSubmit(fm.execute)}>
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
                        <label className="label is-size-7">Hour {errors.hour?.message ? <span className="has-text-danger">({errors.hour?.message})</span> : ''}</label>
                         <div className="control">
                           <div className="select is-small is-rounded is-fullwidth" type="text" placeholder="Day" 
                           {...register('hour', 
                           { 
                                required: true, 
                            })}>
                                <select>
                                    <TimeOptions />
                                </select>
                            </div>
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
                        <label className="label is-size-7">
                            Type
                        </label>
                        <div className="control">
                            <div className="select is-small is-fullwidth is-rounded">
                                <select {...register('type')} disabled={!types}>
                                    <option value=''>Select Type</option>
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