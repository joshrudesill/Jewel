import SchedApt from '../components/schedule-apt'
import useFetchManager from '../util/usefetchmanager';
import { useRouter } from 'next/router';
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
dayjs.extend(utc)
dayjs.extend(timezone)

const UserAptList = ({ day, month }) => {
    const router = useRouter();
    const creator = router.query.scheduler
    const tz = dayjs.tz.guess()
    const { isHandlingRequest, data, error } = useFetchManager('/api/usergetapts', { creator: creator, day: day, month: month, tz: tz } , 'GET')

    if (error) return <>{error}</>
    if (isHandlingRequest) return <>Loading..</>
    if (data && data.length === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
    if (data) return (
        <div className='columns is-multiline is-variable is-1'>
            {
                data.map(a => <SchedApt key={a.id} a={a}/>)
            }
        </div>
    )
}

export default UserAptList;