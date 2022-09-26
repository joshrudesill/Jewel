import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AptListv2 from '../../../components/apt-list-v2';
import AptSort from '../../../components/apt-sort';
import CreatorNavBar from '../../../components/creator-navbar';
import useAuthManager from '../../../util/useauthmanager';
import useFetchManager from '../../../util/usefetchmanager';

const UserProfile = () => {
    const router = useRouter();
    const creator = router.query.creator
    const { authorized, processingAuth, error } = useAuthManager(creator, true)
    const [sortBy, setSortBy] = useState('da')
    const [showClaimed, setShowClaimed] = useState('a')
    const [typeSort, setTypeSort] = useState(0)
    const [types, setTypes] = useState()
    const [date, setDate] = useState()
   
    const aptTypes = useFetchManager('/api/getapttypes', { creator: creator }, 'GET', false)
    useEffect(() => {
        if(creator !== undefined) {
            aptTypes.execute()
        }
    }, [creator])
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
            <>
           
            <CreatorNavBar creator={creator}/>
                <section className="section pt-4">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column">

                                <AptSort 
                                    sortby={sortBy} 
                                    setsortby={setSortBy} 
                                    showclaimed={showClaimed} 
                                    setshowclaimed={setShowClaimed}
                                    typesort={typeSort}
                                    settypesort={setTypeSort}
                                    types={types}
                                    date={date}
                                    setdate={setDate}
                                />

                                <AptListv2 
                                    creator={router.query.creator} 
                                    sortBy={sortBy} 
                                    showclaimed={showClaimed}
                                    typesort={typeSort}
                                    types={types}
                                    date={date}
                                />

                            </div>
                        </div>
                    </div>
                </section>
                </>
        )
    }
}







export default UserProfile;