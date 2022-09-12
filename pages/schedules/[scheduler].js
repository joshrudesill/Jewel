import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserAptList from '../../components/user-apt-list';
import UserAptSort from '../../components/user-apt-sort';
import useFetchManager from '../../util/usefetchmanager';

const Scheduler = () => {
    const router = useRouter();
    const creator = router.query.scheduler
    const [ month, setMonth ] = useState()
    const [ day, setDay ] = useState()
    const [ date, setDate ] = useState()
    const [ types, setTypes ] = useState()
    const [ sortType, setSortType ] = useState(0)
    const { data, error, isHandlingRequest, status } = useFetchManager('/api/getapttypes', { creator: creator }, 'GET')

    useEffect(() => {
        if(!isHandlingRequest && status === 200) {
            setTypes(data)
        }
    }, [status, isHandlingRequest])

    return (
        <div className='container'>
            <div className='columns mt-5'>
                <div className='column'>
                    <span className='is-size-4'>
                        {`Schedule an appointment with ${creator}!`}
                    </span>
                </div>
            </div>
            <UserAptSort 
                day={day} 
                setday={setDay} 
                month={month} 
                setmonth={setMonth}
                date={date} 
                setdate={setDate} 
                types={types} 
                setsorttype={setSortType}
                sorttype={sortType}
            />
            <UserAptList 
                day={day} 
                month={month} 
                date={date} 
                type={sortType}
            />
        </div>
    )
}


export default Scheduler;