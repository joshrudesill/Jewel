import Appointment from '../components/appointment';
import useFetchManager from '../util/usefetchmanager';

const AptListv2 = ({ creator, sortBy }) => {
  const { isHandlingRequest, data, error } = useFetchManager('/api/getapts', { creator: creator, sortby: sortBy }, 'GET')

  if (isHandlingRequest) return <div>Loading</div>
  if (error) return <div>{error}</div>
  if (data) return data.map(d => <Appointment key={d.id} a={d}/>)
}


export default AptListv2;