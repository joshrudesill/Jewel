import SchedApt from '../components/schedule-apt'
import useFetchManager from '../util/usefetchmanager';
import { useRouter } from 'next/router';

const UserAptList = () => {
    const router = useRouter();
    const creator = router.query.scheduler
    const { isHandlingRequest, data, error } = useFetchManager('/api/usergetapts', { creator: creator } , 'GET')

    if (error) return <>{error}</>
    if (isHandlingRequest) return <>Loading..</>
    if (data.length === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
    if (data) return (
        <div className='columns is-multiline is-variable is-1'>
            {
                data.map(a => <SchedApt key={a.id} a={a}/>)
            }
        </div>
    )
}

export default UserAptList;