import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AptListv2 from '../../components/apt-list-v2';
import AptSort from '../../components/apt-sort';
import AptSummary from '../../components/apt-summary';
import AptTypeCreate from '../../components/apt-type-create';
import CreateAppointment from '../../components/create-apt'
import CreatorNamecard from '../../components/creator-namecard';
import useAuthManager from '../../util/useauthmanager';
import useFetchManager from '../../util/usefetchmanager';

const UserProfile = () => {
    const router = useRouter();
    const creator = router.query.creator
    const { authorized, processingAuth, error } = useAuthManager(creator, true)
    const [sortBy, setSortBy] = useState('da')
    const [showClaimed, setShowClaimed] = useState('a')
    const [typeSort, setTypeSort] = useState(0)
    const [types, setTypes] = useState()
    const aptTypes = useFetchManager('/api/getapttypes', { creator: creator }, 'GET')
    useEffect(() => {
        if(!aptTypes.isHandlingRequest && aptTypes.status === 200) {
            setTypes(aptTypes.data)
        }
    }, [aptTypes.status, aptTypes.isHandlingRequest])
    
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
                            
                            <AptTypeCreate creator={creator} />    

                            <div className="columns p-0">
                                <div className="column">
                                    <CreateAppointment username={router.query.creator} types={types}/>
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
                                typesort={typeSort}
                                settypesort={setTypeSort}
                                types={types}
                            />

                            <AptListv2 
                                creator={router.query.creator} 
                                sortBy={sortBy} 
                                showclaimed={showClaimed}
                                typesort={typeSort}
                                types={types}
                            />

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}







export default UserProfile;