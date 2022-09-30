import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetchManager from "../util/usefetchmanager";
import TimeOptions from "./timeoptions";
const dayjs = require('dayjs');
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
var timezone = require('dayjs/plugin/timezone') 
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
const CreateSchedule = ({ types, creator, showMessage, dispatch }) => {
    const tz = dayjs.tz.guess()
    const { 
        reset,
        resetField,
        watch, 
        register, 
        setValue, 
        handleSubmit, 
        formState: { 
            errors 
        } 
    } 
    = useForm(
        {
            mode: 'onSubmit', 
            defaultValues: {
                days: {
                    su: false,
                    mo: true,
                    tu: true,
                    we: true,
                    th: true,
                    fr: true,
                    sa: false
                },
                from: '9:00',
                to: '17:00',
                efrom: 0,
                eto: 0,
                type: 0,
                length: 45,
                nextunit: 'week',
                nextamount: 1,
                price: 0
            }
    })

    const watchFields = watch()
    const { execute, data, status, isHandlingRequest, error } = useFetchManager('/api/createschedule', { watchFields, creator: creator, tz: tz }, 'POST', false)
    const [lockDuration, setLockDuration] = useState(false)
    const [lockPrice, setLockPrice] = useState(false)
    const [typeIndex, setTypeIndex] = useState()
    
    useEffect(() => {
        reset()
    }, [])
    
    useEffect(() => {
        if(error) {
            console.error(error)
        }
    }, [error])

    useEffect(() => {
        if(!isHandlingRequest && data){
            if(status === 200) {
                reset()
                alert('Success')
            } else {
                alert('Failed to create schedule')
            }
        }
    }, [isHandlingRequest, status])
    useEffect(() => {
        if(parseInt(watchFields.type) === 0) {
            resetField('length', { defaultValue: 45 })
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
            setValue('length', types[typeIndex].defaultTime)
        }
    }, [typeIndex])

    return (
    <>
    
    <div className="columns is-centered">
        <div className="column is-9">
            <div className="columns">
                <div className="column">    
                    <div className={`${!showMessage ? 'is-hidden' : ''} notification is-shadowless has-background-primary p-3`}>
                        <span className="icon-text">
                            <span className="icon is-size-5"><ion-icon name="information-circle-outline"></ion-icon></span>
                        </span>
                        <button className="delete" onClick={()=>dispatch({type: 'schedule'})}></button>
                        <span>
                            Once submitted this will create appointments of your desired time and within your desired time frame with an optional break. It will only apply to the days you choose
                            and for the amount of weeks or months you want. Note: if you select a type it will lock the time and will also apply the appointment type price to all created appointments.<br/>
                            <span className="has-text-danger">Important: </span><span className="is-underlined"> Once submitted all conflicting appointments in your selected timeframe will be deleted and replaced!</span>
                        </span>
                    </div>
                </div>

            </div>
            <form onSubmit={handleSubmit(execute)}>  
            <div className="card mt-3 ">
                <div className="card-content has-text-weight-medium ">
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="play-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        From
                                    </span>

                                </label>
                                <div className="control">
                                    <div className="select is-rounded is-small is-fullwidth">
                                        <select {...register('from')} value={watchFields.from}>
                                            <TimeOptions optionsOnly={true}/>
                                        </select>
                                    </div>
                                </div>
                                <p className="help">{errors?.to?.type === 'checkTimes' ? errors.to.message : ''}</p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="stop-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        To 
                                    </span>
                                </label>
                                <div className="control">
                                    <div className="select is-rounded is-small is-fullwidth">
                                        <select value={watchFields.to} {...register('to', {
                                            validate: {
                                                checkTimes: () => {
                                                    const fromInt = parseInt(watchFields.from)
                                                    const toInt = parseInt(watchFields.to)
                                                    if(fromInt === 0 || toInt === 0) {
                                                        return 'You must select a time for both'
                                                    }
                                                    const fh = watchFields.from.substring(0, watchFields.from.indexOf(':'))
                                                    const fm =  watchFields.from.substring(watchFields.from.indexOf(':') +1, watchFields.from.length)
                                                    const th =  watchFields.to.substring(0, watchFields.to.indexOf(':'))
                                                    const tm = watchFields.to.substring(watchFields.to.indexOf(':') +1, watchFields.to.length)
                                                    var from = dayjs().set('hour', parseInt(fh)).set('minute', fm)
                                                    var to = dayjs().set('hour', th).set('minute',  tm)
                                                    if(from.isSameOrAfter(to)) {
                                                        return 'From must be before to!'
                                                    } else {
                                                        return true
                                                    }
                                                }
                                            } 
                                        })}>
                                            <TimeOptions optionsOnly={true}/>
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
                                        <ion-icon name="close-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        Except From
                                    </span>
                                        
                                </label>
                                <div className="control">
                                    <div className="select is-rounded is-small is-fullwidth">
                                        <select value={watchFields.efrom} {...register('efrom')}>
                                            <TimeOptions optionsOnly={true}/>
                                        </select>
                                    </div>
                                </div>
                                <p className="help has-text-primary">{errors?.eto?.type === 'checkTimes' ? errors.eto.message : 'Leave blank for none'}</p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="close-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        To 
                                    </span>
                                        
                                </label>
                                <div className="control">
                                    <div className="select is-rounded is-small is-fullwidth">
                                        <select value={watchFields.eto} {...register('eto', {
                                                validate: {
                                                    checkTimes: () => {
                                                        const efromInt = parseInt(watchFields.efrom)
                                                        const etoInt = parseInt(watchFields.eto)
                                                        if(efromInt=== 0 && etoInt === 0) {
                                                            return true
                                                        }
                                                        if(efromInt !== 0 && etoInt === 0) {
                                                            return 'You must choose a time for both'
                                                        }
                                                        if(efromInt === 0 && etoInt !== 0) {
                                                            return 'You must choose a time for both'
                                                        }
                                                        const fh = watchFields.efrom.substring(0, watchFields.efrom.indexOf(':'))
                                                        const fm =  watchFields.efrom.substring(watchFields.efrom.indexOf(':') +1, watchFields.efrom.length)
                                                        const th =  watchFields.eto.substring(0, watchFields.eto.indexOf(':'))
                                                        const tm = watchFields.eto.substring(watchFields.eto.indexOf(':') +1, watchFields.eto.length)
                                                        var from = dayjs().set('hour', parseInt(fh)).set('minute', fm)
                                                        var to = dayjs().set('hour', th).set('minute',  tm)
                                                        if(from.isSameOrAfter(to)) {
                                                            return 'From must be before to!'
                                                        } else {
                                                            return true
                                                        }
                                                    }
                                                } 
                                            })}>
                                                <TimeOptions optionsOnly={true}/>
                                            </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <input {...register('days' ,{
                                validate: {
                                    checkOneDay: () => Object.values(watchFields.days).some(e => e !== false) || 'Must have at least one day selected!'
                                }
                            })} className='is-hidden'></input>
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="calendar-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        Apply To Days <span className="has-text-danger">{errors?.days?.type === 'checkOneDay' ? errors.days.message : ''}</span>
                                    </span>
                                
                                </label>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <div className={`button is-small ${watchFields.days.su ? 'has-background-primary' : ''} `} onClick={() => setValue('days.su', !watchFields.days.su)}>Su</div>
                                </div>
                                <div className="control">
                                    <div className={`button is-small ${watchFields.days.mo ? 'has-background-primary' : ''} `} onClick={() => setValue('days.mo', !watchFields.days.mo)}>Mo</div>
                                </div>
                                <div className="control">
                                    <div className={`button is-small ${watchFields.days.tu ? 'has-background-primary' : ''} `} onClick={() => setValue('days.tu', !watchFields.days.tu)}>Tu</div>
                                </div>
                                <div className="control">
                                    <div className={`button is-small ${watchFields.days.we ? 'has-background-primary' : ''} `} onClick={() => setValue('days.we', !watchFields.days.we)}>We</div>
                                </div>
                                <div className="control">
                                    <div className={`button is-small ${watchFields.days.th ? 'has-background-primary' : ''} `} onClick={() => setValue('days.th', !watchFields.days.th)}>Th</div>
                                </div>
                                <div className="control">
                                    <div className={`button is-small ${watchFields.days.fr ? 'has-background-primary' : ''} `} onClick={() => setValue('days.fr', !watchFields.days.fr)}>Fr</div>
                                </div>
                                <div className="control">
                                    <div className={`button is-small ${watchFields.days.sa ? 'has-background-primary' : ''} `} onClick={() => setValue('days.sa', !watchFields.days.sa)}>Sa</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="hourglass-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        Time Of Appointments
                                    </span>
                                
                                </label>
                                <div className="control ">
                                    <div className="select is-small is-rounded is-fullwidth">
                                        
                                        <select value={watchFields.length} {...register('length')} disabled={lockDuration}>
                                            {
                                                lockDuration && types ? <option value={types[typeIndex].defaultTime}>{`${types[typeIndex].defaultTime} min`}</option> : 
                                                <>
                                                    <option value={15}>15 min</option>
                                                    <option value={30}>30 min</option>
                                                    <option value={45}>45 min</option>
                                                    <option value={60}>60 min</option>
                                                    <option value={90}>90 min</option>
                                                    <option value={120}>120 min</option>
                                                </>
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    <div className="select is-small is-rounded is-fullwidth">
                                        <select {...register('type')}>
                                            <option value={0}>No type</option>
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
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="arrow-forward-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        For The Next 
                                    </span>
                                
                                </label>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <div className="select is-small is-rounded is-fullwidth">
                                        <select {...register('nextamount')}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="control is-fullwidth">
                                    <div className="select is-small is-rounded is-fullwidth">
                                        <select {...register('nextunit')}>
                                            <option value='week'>Week(s)</option>
                                            <option value='month'>Month(s)</option>
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                <div className="card-footer">
                </div>
                <button type='submit' className="button is-primary is-small card-footer-item mt-2" disabled={isHandlingRequest}>Submit</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    </>    
            )
    
}


export default CreateSchedule;