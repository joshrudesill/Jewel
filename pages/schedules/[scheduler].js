import SchedApt from '../../components/schedule-apt';
import useFetchManager from '../../util/usefetchmanager';
import { useRouter } from 'next/router';

const Scheduler = () => {
    const router = useRouter();
    const creator = router.query.scheduler
    const { isHandlingRequest, data, error } = useFetchManager('/api/usergetapts', { creator: creator } , 'GET')

    if (error) return <>{error}</>
    if (isHandlingRequest) return <>Loading..</>
    if (data.length === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
    if (data) return (
        <div className='container'>
            <div className='is-size-3 mb-4 mt-4'>
                {creator}
            </div>
            <div className='column'>
                {
                    data.map(a => <SchedApt a={a}/>)
                }
            </div>
        </div>
    )
}


export default Scheduler;