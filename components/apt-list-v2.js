import Appointment from '../components/appointment';
import AptPage from '../components/apt-page';
import useFetchManager from '../util/usefetchmanager';
import { useEffect, useState } from 'react';

const AptListv2 = ({ creator, sortBy, showclaimed, typesort, types }) => {
  const [page, setPage] = useState(1)
  const [typesL, setTypesL] = useState()
  const { isHandlingRequest, data, error } = useFetchManager('/api/getapts', { creator: creator, sortby: sortBy, claimed: showclaimed, typesort: typesort, page: page }, 'GET')
  useEffect(() => {
    setPage(1)
  }, [showclaimed, typesort])
  useEffect(() => {
    if(types !== undefined) {
      var arrToAdd = {}
      types.forEach(t => {
        arrToAdd[t.id] = {...t}
      })
      setTypesL(arrToAdd)
    }
  }, [types])

  if (isHandlingRequest) return <div>Loading</div>
  if (error) return <div>{error}</div>
  if (data && data.count === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
  if (data && types)
    return (
      <>
        <AptPage page={page} setPage={setPage} results={data.count}/>
          { 
            data.rows.map(d => {
                return <Appointment type={ typesL ? typesL[d.aptType] : false } key={d.id} a={d}/>
            })
          }
      </>
    )
}


export default AptListv2;