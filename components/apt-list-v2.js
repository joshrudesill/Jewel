import Appointment from '../components/appointment';
import AptPage from '../components/apt-page';
import useFetchManager from '../util/usefetchmanager';
import { useState } from 'react';

const AptListv2 = ({ creator, sortBy, showclaimed }) => {
  const [page, setPage] = useState(1)
  const { isHandlingRequest, data, error } = useFetchManager('/api/getapts', { creator: creator, sortby: sortBy, claimed: showclaimed, page: page }, 'GET')

  if (isHandlingRequest) return <div>Loading</div>
  if (error) return <div>{error}</div>
  if (data && data.length === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
  if (data)
    return (
      <>
        <AptPage page={page} setPage={setPage} results={data.count}/>
        {data.rows.map(d => {
            return <Appointment key={d.id} a={d}/>
        })}
      </>
    )
}


export default AptListv2;