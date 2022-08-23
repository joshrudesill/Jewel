import { useRouter } from 'next/router';
import { useState } from 'react';
import AptListv2 from '../../components/apt-list-v2';
import AptSort from '../../components/apt-sort';
import AptSummary from '../../components/apt-summary';
import CreateAppointment from '../../components/create-apt'
import CreatorNamecard from '../../components/creator-namecard';
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

                            <CreatorNamecard username={router.query.creator}/>
                            
                            <div className="columns p-0">
                                <div className="column">
                                        <CreateAppointment username={router.query.creator}/>
                                </div>
                            </div>
                            
                        <AptSummary />
                            
                        </div>
                        <div className="column is-two-thirds">

                            <AptSort 
                                sortby={sortBy} 
                                setsortby={setSortBy} 
                                showclaimed={showClaimed} 
                                setshowclaimed={setShowClaimed} 
                            />

                            <AptListv2 
                                creator={router.query.creator} 
                                sortBy={sortBy} 
                                showclaimed={showClaimed} 
                            />

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}







export default UserProfile;