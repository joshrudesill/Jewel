import { useForm } from "react-hook-form";
import AptDate from "./apt-date";
import useFetchManager from '../util/usefetchmanager';

const UserAptModal = ({ active, setactive, apt }) => {
    const { handleSubmit, register, formState: { errors }, watch } = useForm({mode: 'onChange'});
    const watchFields = watch();
    const { isHandlingRequest, data, error, execute } = useFetchManager('/api/bookapt', { watchFields, aID: apt.id } , 'POST', false);
    
    const onError = err => console.log(err)
    return (
        <div className={`modal ${active ? 'is-active' : ''}`}>
            {error}
            <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Appointment at <AptDate startTime={apt.startTime} endTime={apt.endTime}/> </p>
                        <button className="delete" aria-label="close" onClick={() => setactive(false)}></button>
                    </header>
                <form onSubmit={handleSubmit(execute, onError)}>
                <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Write a message (optional)</label>
                            <div className="control">
                                <textarea className='textarea is-success' placeholder="Message (optional)" {...register('message',{
                                    required: false
                                })}>
                                </textarea>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email (Required) 
                            {errors.email?.message ? <span className="has-text-danger">{errors.email?.message}</span> : ''}
                            {errors.email?.type === 'pattern' ? <span className="has-text-danger"> Invalid Email</span> : ''}
                            </label>
                            <div className="control">
                                <input className="input"{...register('email', {
                                    required: 'Email Required',
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })}></input>
                            </div>
                        </div>
                </section>
                <footer className="modal-card-foot">
                    <input type="submit" className="button" value="Book"></input>
                    <button className="button" onClick={() => setactive(false)}>Cancel</button>
                </footer>
                </form>
            </div>
        </div>
    )
}

export default UserAptModal; 