import Appointment from '../components/appointment';
import AptPage from '../components/apt-page';
import useFetchManager from '../util/usefetchmanager';
import { useEffect, useState } from 'react';

const AptListv2 = ({ creator, sortBy, showclaimed}) => {
  const { isHandlingRequest, data, error } = useFetchManager('/api/getapts', { creator: creator, sortby: sortBy, claimed: showclaimed }, 'GET')
  const [page, setPage] = useState(1)
  
  

  if (isHandlingRequest) return <div>Loading</div>
  if (error) return <div>{error}</div>
  if (data.length === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
  if (data) 
    return (
      <>
        <AptPage page={page} setPage={setPage} results={data.length}/>
        {data.map((d, i) => {
          if(i > ((page-1) * 10) && i < (page * 10)) {
            return <Appointment key={d.id} a={d} t={i}/>
          }
        })}
      </>
    )
}


export default AptListv2;