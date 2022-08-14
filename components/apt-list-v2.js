import Appointment from '../components/appointment';
import useFetchManager from '../util/usefetchmanager';

const AptListv2 = ({ creator, sortBy, showclaimed }) => {
  const { isHandlingRequest, data, error } = useFetchManager('/api/getapts', { creator: creator, sortby: sortBy, claimed: showclaimed }, 'GET')

  if (isHandlingRequest) return <div>Loading</div>
  if (error) return <div>{error}</div>
  if (data.length === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
  if (data) return data.map(d => <Appointment key={d.id} a={d}/>)
}


export default AptListv2;