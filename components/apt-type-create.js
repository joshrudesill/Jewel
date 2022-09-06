import { useForm } from "react-hook-form";


const AptTypeCreate = () => {
    const { handleSubmit, register, formState: { errors, isValid, isDirty }, watch } = useForm({ mode: 'onChange' })

    return (
        <div className="card">
            <div className="card-content p-3">
                <div className="columns">
                    <div className="column has-background-success-light">
                        <span>Create Appointment Type</span>
                    </div>
                </div>
                <form onSubmit={ handleSubmit() }>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-small">Type Name</label>
                                    <input className="input is-rounded is-small" type='text' {
                                        ...register('tname' , {
                                            required: true,
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
                                    <label className="label is-small">Price</label>
                                    <input className="input is-rounded is-small" type='text' {
                                        ...register('price' , {
                                            required: true,
                                            valueAsNumber: true,
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
                            <label className="label is-small">Default Time (minutes)</label>
                            <div className="field has-addons has-addons-right">
                                <div className="control is-expanded">
                                    <input className="input is-rounded is-small" type='text' {
                                        ...register('tname' , {
                                            required: true,
                                            pattern: {
                                                value: /^[1-9]+[0-9]*$/,
                                                message: 'Not a valid time'
                                            }

                                        })
                                    }></input>
                                </div>
                                <p class="control">
                                    <a class="button is-primary is-small is-rounded">
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
                                    <label className="label is-small">Type Description</label>
                                    <textarea className="textarea is-rounded " type='text' {
                                        ...register('tname' , {
                                            required: true,
                                            maxLength: 25
                                        })
                                    }></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AptTypeCreate;