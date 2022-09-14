import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFetchManager from "../util/usefetchmanager";
import TimeOptions from "./timeoptions";
const dayjs = require('dayjs');
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
const CreateSchedule = ({ types }) => {
    const { 
        reset,
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
            mode: 'onChange', 
            defaultValues: {
                days: {
                    su: false,
                    m: true,
                    t: true,
                    w: true,
                    th: true,
                    f: true,
                    sa: false
                },
                from: '9:00',
                to: '17:00',
                efrom: 0,
                eto: 0,
                type: 0,
                length: 45,
                nextunit: 'week',
                nextamount: 1
            }
    })

    const watchFields = watch()
    useEffect(() => {
        reset()
    }, [])
    const e = () => {
        console.log('a')
    }
    return (
        <div className="card mt-5">
            <div className="card-content p-3">
                <div className="columns">
                    <div className="column has-background-success-light">
                        <span>Create Schedule</span>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit(e)}>
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label>From</label>
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
                            <label>To</label>
                            <div className="control">
                                <div className="select is-rounded is-small is-fullwidth">
                                    <select value={watchFields.to} {...register('to', {
                                        validate: {
                                            checkTimes: () => {
                                                if(watchFields.from === '0' || watchFields.to === '0') {
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
                            <label>Except From</label>
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
                            <label>To</label>
                            <div className="control">
                                <div className="select is-rounded is-small is-fullwidth">
                                    <select value={watchFields.eto} {...register('eto', {
                                            validate: {
                                                checkTimes: () => {
                                                    if(watchFields.efrom === 0 && watchFields.eto === 0) {
                                                        return true
                                                    }
                                                    if(watchFields.efrom !== 0 && watchFields.eto === 0) {
                                                        return 'You must choose a time for both'
                                                    }
                                                    if(watchFields.efrom === 0 && watchFields.eto !== 0) {
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
                            <label>Apply to days {errors?.days?.type === 'checkOneDay' ? errors.days.message : ''}</label>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className={`button is-small ${watchFields.days.su ? 'has-background-primary' : ''} `} onClick={e => setValue('days.su', !watchFields.days.su)}>Su</button>
                            </div>
                            <div className="control">
                                <button className={`button is-small ${watchFields.days.m ? 'has-background-primary' : ''} `} onClick={e => setValue('days.m', !watchFields.days.m)}>Mo</button>
                            </div>
                            <div className="control">
                                <button className={`button is-small ${watchFields.days.t ? 'has-background-primary' : ''} `} onClick={e => setValue('days.t', !watchFields.days.t)}>Tu</button>
                            </div>
                            <div className="control">
                                <button className={`button is-small ${watchFields.days.w ? 'has-background-primary' : ''} `} onClick={e => setValue('days.w', !watchFields.days.w)}>We</button>
                            </div>
                            <div className="control">
                                <button className={`button is-small ${watchFields.days.th ? 'has-background-primary' : ''} `} onClick={e => setValue('days.th', !watchFields.days.th)}>Th</button>
                            </div>
                            <div className="control">
                                <button className={`button is-small ${watchFields.days.f ? 'has-background-primary' : ''} `} onClick={e => setValue('days.f', !watchFields.days.f)}>Fr</button>
                            </div>
                            <div className="control">
                                <button className={`button is-small ${watchFields.days.sa ? 'has-background-primary' : ''} `} onClick={e => setValue('days.sa', !watchFields.days.sa)}>Sa</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label>Time of Appointments</label>
                            <div className="control ">
                                <div className="select is-small is-rounded is-fullwidth">
                                    <select {...register('length')}>
                                        <option value={15}>15 min</option>
                                        <option value={30}>30 min</option>
                                        <option value={45}>45 min</option>
                                        <option value={60}>60 min</option>
                                        <option value={90}>90 min</option>
                                        <option value={120}>120 min</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label>Type</label>
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
                            <label>For the next</label>
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
                <input type='submit'></input>
                </form>
            </div>
        </div>
    )
}


export default CreateSchedule;