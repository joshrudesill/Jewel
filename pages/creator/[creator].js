import * as cookie from 'cookie'
import { useEffect, useState } from 'react'
import Appointment from '../../components/appointment';
import CreateAppointment from '../../components/create-apt'

const UserProfile = ({username, apt}) => {
    const [apts, setApts] = useState();
    useEffect(() => {
        if(apt) {
            const parsed = JSON.parse(apt);
            console.log(parsed)
            setApts(parsed)
        } else {
            setApts([])
        }
    }, [])
    return (
        <section className="section">
        <div className="container.is-widescreen">
            <div className="columns">
                <div className="column is-one-quarter">
                    <div className="card mt-5">
                        <div className="card-content">
                            <div className="columns" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.377)'}}>
                                <div className="column">
                                    <button className="button is-small is-primary is-outlined"><ion-icon className="mr-1" name="shield-half-outline"></ion-icon>Creator</button>
                                </div>
                                <div className="column has-text-right">
                                    <span className="tag">8 appointments today</span>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <p className="is-size-5 has-text-weight-medium">{username}</p>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column ml-1 icon-text">
                                    <span className="icon is-size-4 mr-3"><ion-icon name="calendar-outline"></ion-icon></span>
                                    <span className="has-text-weight-bold is-size-6">Appointments Today: </span>
                                    <span className="is-size-5 ml-4">8 (3 with <span className="is-italic is-underlined has-text-info"> notes</span>)</span>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column ml-1 icon-text">
                                    <span className="icon is-size-4 mr-3 has-text-success"><ion-icon name="stats-chart-outline"></ion-icon></span>
                                    <span className="has-text-weight-bold is-size-6">Projected Revenue: </span>
                                    <span className="is-size-5 ml-4"> $185.26</span>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <p className="is-size-5 has-text-weight-medium">Last Week</p>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column ml-1 icon-text">
                                    <span className="icon is-size-4 mr-3"><ion-icon name="calendar-outline"></ion-icon></span>
                                    <span className="has-text-weight-bold is-size-6">Appointments completed:</span>
                                    <span className="is-size-5 ml-4">36 </span>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column ml-1 icon-text">
                                    <span className="icon is-size-4 mr-3 has-text-success"><ion-icon name="cash-outline"></ion-icon></span>
                                    <span className="has-text-weight-bold is-size-6">Realized Gain: </span>
                                    <span className="is-size-5 ml-4"> $2307.65</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-5">
                        <div className="card-content">
                            <div className="columns">
                                <div className="column  is-2 has-text-weight-bold">
                                    <figure className="image is-48x48">
                                        <img src="http://placeimg.com/48/48/arch"></img>
                                    </figure>
                                </div>
                                <div className="column is-size-4 p-2">
                                    <p>JohnDoe</p>
                                    <p className="is-size-7">The Example Company</p>
                                </div>
                                <div className="column is-size-3 has-text-right">
                                    <button className="button is-link is-outlined">
                                        <span className="icon is-medium">
                                            <ion-icon size="large" name="cog-outline"></ion-icon>
                                        </span>
                                      </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-three-quarters">
                    <CreateAppointment username={username}></CreateAppointment>
                    
                            {
                                apts ? apts.map(a => 
                                    <Appointment a={a}></Appointment>        
                                ) : ''
                            }
                </div>
            </div>
        </div>
      </section>
    )
}

const verify = require('../../auth/helpers')
const model = require('../../orm/index')

export async function getServerSideProps(context) {
    const cook = context.req.headers.cookie;
    const parsed = cookie.parse(cook)
    var authen = await verify.verifyJWT(parsed.token, context.params.creator)
    if(authen.auth && authen.act === 'admin') {
        const apts = await model.Appointments.findAll({ 
            where: { 
                adminID: authen.id 
            }, 
                attributes: [
                    'adminID', 
                    'userID', 
                    'userEmail',
                    'startTime', 
                    'endTime'
                ] 
            })
        if (apts) {
            return {
                props: {
                    username: authen.username,
                    apt: JSON.stringify(apts)
                }
            }
        } else {
            return {
                props: {
                    username: authen.username
                }
            }
        }
    } else {
        return {
            redirect: {
                destination: '/asd',
                permanent: false
            }
        }
    }
}




export default UserProfile;