import { useForm } from "react-hook-form";
import useFetchManager from '../util/usefetchmanager';
import { useState, useEffect } from "react";

const AptTypeCreate = ({ creator }) => {
    const { handleSubmit, register, formState: { errors, isValid, isDirty }, watch } = useForm({ mode: 'onSubmit' })
    const watchFields = watch();
    const { isHandlingRequest, error, status, execute, data } = useFetchManager('/api/createtype', { watchFields, admin: creator } , 'POST', false);
    const onError = e => console.log(e)

    useEffect(() => {
        if(!isHandlingRequest && data){
            if(status === 200) {
                alert('Success')
            } else {
                alert('Failed to create schedule')
            }
        }
    }, [isHandlingRequest, status])

    return (
        <div className="columns is-centered">
            <div className="column is-7">

        
        <div className="card mt-5">
            <div className="card-content has-text-weight-medium p-3">
                <form onSubmit={ handleSubmit(execute, onError) }>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="hourglass-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        Type Name <span className="has-text-danger">{errors.tname?.message}</span>
                                    </span>
                                
                                </label>
                                <div className="control">
                                    <input className="input is-rounded " type='text' {
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
                            <label className="icon-text is-size-5 mb-1">
                                    <span className="icon">
                                        <ion-icon name="hourglass-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        Price <span className="has-text-danger">{errors.price?.message}</span>
                                    </span>
                                
                                </label>
                                <div className="control">
                                    <input className="input is-rounded " type='text' {
                                        ...register('price' , {
                                            required: 'This field is required',
                                            pattern: {
                                                value: /^\d{0,8}(\.\d{1,2})?$/,
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
                            <div className="field">
                                <label className="icon-text is-size-5 mb-1" >
                                    <span className="icon">
                                        <ion-icon name="hourglass-outline"></ion-icon>
                                    </span>
                                    <span className="label">
                                        Default Time<span className="has-text-danger" >{errors.dtime?.message}</span>
                                    </span>
                                
                                </label>
                                <div className="control is-expanded">
                                    <input className="input is-rounded " type='text' {
                                        ...register('dtime' , {
                                            required: 'This field is required',
                                            pattern: {
                                                value: /^[1-9]+[0-9]*$/,
                                                message: 'Not a valid time'
                                            }
                                        })
                                    }></input>
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
                                        Type Name <span className="has-text-danger">{errors.tdesc?.message}</span>
                                    </span>
                                
                                </label>
                                <div className="control">
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
                    <div className="card-footer">
                    </div>
                    <button type='submit' className="button is-primary  card-footer-item mt-2" disabled={isHandlingRequest}>Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
    )
}

export default AptTypeCreate;