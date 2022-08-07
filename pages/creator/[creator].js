import { useRouter } from 'next/router';
import { useState } from 'react';
import AptListv2 from '../../components/apt-list-v2';
import CreateAppointment from '../../components/create-apt'
import useAuthManager from '../../util/useauthmanager';

const UserProfile = () => {
    const router = useRouter();
    const creator = router.query.creator
    const { authorized, processingAuth, error } = useAuthManager(creator, true)
    const [sortBy, setSortBy] = useState('dd')
    const [showClaimed, setShowClaimed] = useState('a')
    if (error) {
        console.error(error)
        router.push('/')
    }
    if (processingAuth) return <div>Loading...</div>
    if(!processingAuth && !authorized) {
        router.push('/')
    }
    if (authorized) {
        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-one-third">
                            <div className="card">
                                <div className="card-content">
                                    <div className="columns">
                                        <div className="column is-2 has-text-weight-bold">
                                            <figure className="image is-48x48">
                                                <img alt='profile' src="http://placeimg.com/48/48/arch"></img>
                                            </figure>
                                        </div>
                                        <div className="column is-size-4 p-2">
                                            <p>{router.query.creator}</p>
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
                            <div className="columns p-0">
                                <div className="column">
                                        <CreateAppointment username={router.query.creator}/>
                                </div>
                            </div>
                            <div className="card mt-2">
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
                                            <p className="is-size-6 has-text-weight-medium">Today&apos;s Outlook</p>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column ml-1 icon-text">
                                            <span className="icon is-size-5 mr-3"><ion-icon name="calendar-outline"></ion-icon></span>
                                            <span className="has-text-weight-bold is-size-6">Appointments Today: </span>
                                            <span className="is-size-6 ml-4">8 (3 with <span className="is-italic is-underlined has-text-info"> notes</span>)</span>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column ml-1 icon-text">
                                            <span className="icon is-size-5 mr-3 has-text-success"><ion-icon name="stats-chart-outline"></ion-icon></span>
                                            <span className="has-text-weight-bold is-size-6">Projected Revenue: </span>
                                            <span className="is-size-6 ml-4"> $185.26</span>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <p className="is-size-6 has-text-weight-medium">Last Week</p>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column ml-1 icon-text">
                                            <span className="icon is-size-5 mr-3"><ion-icon name="calendar-outline"></ion-icon></span>
                                            <span className="has-text-weight-bold is-size-6">Appointments completed:</span>
                                            <span className="is-size-6 ml-4">36 </span>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column ml-1 icon-text">
                                            <span className="icon is-size-5 mr-3 has-text-success"><ion-icon name="cash-outline"></ion-icon></span>
                                            <span className="has-text-weight-bold is-size-6">Realized Gain: </span>
                                            <span className="is-size-6 ml-4"> $2307.65</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-two-thirds">
                            <div className="columns">
                                    <div className="column">
                                        <div className="box is-shadowless has-background-success-light p-3">
                                            <div className="columns">
                                                <div className="column">
                                                    <span className="is-size-3">Appointments</span>
                                                </div>
                                                <div className="column is-narrow">
                                                    <div className="field">
                                                        <label className="label is-size-7">Sort By</label>
                                                        <div className="control">
                                                            <div className="select is-small is-rounded">
                                                                <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                                                                    <option value='dd'>Date desc</option>
                                                                    <option value='da'>Date asc</option>
                                                                    <option value='p'>Price</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column is-narrow">
                                                    <div className="field">
                                                        <label className="label is-size-7">Show</label>
                                                        <div className="control">
                                                            <div className="select is-small is-rounded">
                                                                <select value={showClaimed} onChange={e=>setShowClaimed(e.target.value)}>
                                                                    <option value='a'>All</option>
                                                                    <option value='c'>Claimed</option>
                                                                    <option value='uc'>Unclaimed</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <AptListv2 creator={router.query.creator} sortBy={sortBy} showclaimed={showClaimed}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}







export default UserProfile;