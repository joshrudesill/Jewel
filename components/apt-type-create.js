import { useForm } from "react-hook-form";
import useFetchManager from '../util/usefetchmanager';
import { useState } from "react";

const AptTypeCreate = ({ creator }) => {
    const { handleSubmit, register, formState: { errors, isValid, isDirty }, watch } = useForm({ mode: 'onSubmit' })
    const watchFields = watch();
    const { isHandlingRequest, error, status, execute } = useFetchManager('/api/createtype', { watchFields, admin: creator } , 'POST', false);
    const onError = e => console.log(e)
    const [show,  setShow] = useState(false)
    return (
        <div className="card mt-5" >
            <div className="card-content has-text-weight-medium p-3">
                <div className="columns" onClick={() => setShow(!show)}>
                    <div className="column has-background-success-light">
                        <span>Create Appointment Type <span className="has-text-weight-light">{`${!show ? 'Click to expand' : ''}`}</span></span>
                    </div>
                </div>
                <form className={`${!show ? 'is-hidden' : ''}`} onSubmit={ handleSubmit(execute, onError) }>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-small">Type Name <span className="has-text-danger">{errors.tname?.message}</span></label>
                                    <input className="input is-rounded is-small" type='text' {
                                        ...register('tname' , {
                                            required: {
                                                value: true,
                                                message: 'You must provide a name'
                                            },
                                            maxLength: 25
                                        })
                                    }></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-small">Price <span className="has-text-danger">{errors.price?.message}</span></label>
                                    <input className="input is-rounded is-small" type='text' {
                                        ...register('price' , {
                                            required: 'This field is required',
                                            pattern: {
                                                value: /^\d{0,8}(\.\d{1,4})?$/,
                                                message: 'Not a valid price'
                                            }
                                        })
                                    }></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <label className="label is-small">Default Time (minutes) <span className="has-text-danger">{errors.dtime?.message}</span></label>
                            <div className="field has-addons has-addons-right">
                                <div className="control is-expanded">
                                    <input className="input is-rounded is-small" type='text' {
                                        ...register('dtime' , {
                                            required: 'This field is required',
                                            pattern: {
                                                value: /^[1-9]+[0-9]*$/,
                                                message: 'Not a valid time'
                                            }
                                        })
                                    }></input>
                                </div>
                                <p className="control">
                                    <a className="button is-primary is-small is-rounded">
                                        Always use
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-small">Type Description <span className="has-text-danger">{errors.tdesc?.message}</span></label>
                                    <textarea className="textarea is-rounded " type='text' {
                                        ...register('tdesc' , {
                                            required: false,
                                            maxLength: {
                                                value: 255,
                                                message: '255 characters max!'
                                            }
                                        })
                                    }></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">   
                        <div className="column">
                            <button type='submit' className="button is-small">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AptTypeCreate;