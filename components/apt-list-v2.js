import Appointment from '../components/appointment';
import AptPage from '../components/apt-page';
import useFetchManager from '../util/usefetchmanager';
import { useEffect, useState } from 'react';

const AptListv2 = ({ creator, sortBy, showclaimed }) => {
  const [page, setPage] = useState(1)
  const [types, setTypes] = useState()
  const { isHandlingRequest, data, error } = useFetchManager('/api/getapts', { creator: creator, sortby: sortBy, claimed: showclaimed, page: page }, 'GET')
  const aptTypes = useFetchManager('/api/getapttypes', { creator: creator }, 'GET')

  useEffect(() => {
    if(aptTypes.data && aptTypes.data.length > 0 && !aptTypes.isHandlingRequest) {
      var arrToAdd = {}
      aptTypes.data.forEach(t => {
        arrToAdd[t.id] = {...t}
      })
      setTypes(arrToAdd)
    }
  }, [aptTypes])

  if (isHandlingRequest) return <div>Loading</div>
  if (error) return <div>{error}</div>
  if (data && data.length === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
  if (data)
    return (
      <>
        <AptPage page={page} setPage={setPage} results={data.count}/>
        {types ? types : <>Loading</>}
          { 
            data.rows.map(d => {
                return <Appointment key={d.id} a={d}/>
        })}
      </>
    )
}


export default AptListv2;