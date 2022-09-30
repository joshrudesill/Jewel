import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import UserAptList from '../../components/user-apt-list';
import UserAptSort from '../../components/user-apt-sort';
import UserNavBar from '../../components/user-navbar';
import useFetchManager from '../../util/usefetchmanager';

const Scheduler = () => {
    const router = useRouter();
    const creator = router.query.scheduler
    const [ month, setMonth ] = useState()
    const [ day, setDay ] = useState()
    const [ date, setDate ] = useState()
    const [ types, setTypes ] = useState()
    const [ typesL, setTypesL ] = useState()
    const [ sortType, setSortType ] = useState(0)
    const { data, error, isHandlingRequest, status } = useFetchManager('/api/getapttypes', { creator: creator }, 'GET')

    useEffect(() => {
        if(!isHandlingRequest && status === 200) {
            setTypes(data)
        }
    }, [status, isHandlingRequest])

    useEffect(() => {
        if(types !== undefined) {
            var arrToAdd = {}
            types.forEach(t => {
              arrToAdd[t.id] = {...t}
            })
            setTypesL(arrToAdd)
        }
    }, [types])

    return (
        <>
        <UserNavBar creator={creator}/>
            <div className='container is-fullhd'>
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
                    types={typesL}
                />
            </div>
       <div style={{
            display: 'flex',
            minHeight: '15vh',
        }}>
        </div>
        <Footer />
        </>
    )
}


export default Scheduler;