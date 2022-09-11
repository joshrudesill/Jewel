import { useRouter } from 'next/router';
import { useState } from 'react';
import UserAptList from '../../components/user-apt-list';
import UserAptSort from '../../components/user-apt-sort';

const Scheduler = () => {
    const router = useRouter();
    const creator = router.query.scheduler
    const [ month, setMonth ] = useState()
    const [ day, setDay ] = useState()
    const [ date, setDate ] = useState()
    return (
        <div className='container'>
            <div className='columns mt-5'>
                <div className='column'>
                    <span className='is-size-4'>
                        {`Schedule an appointment with ${creator}!`}
                    </span>
                </div>
            </div>
            <UserAptSort day={day} setday={setDay} month={month} setmonth={setMonth} setdate={setDate}/>
            <UserAptList day={day} month={month} date={date}/>
        </div>
    )
}


export default Scheduler;