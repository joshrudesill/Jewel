import Appointment from '../components/appointment';
import AptPage from '../components/apt-page';
import useFetchManager from '../util/usefetchmanager';
import { useEffect, useState } from 'react';

const AptListv2 = ({ creator, sortBy, showclaimed, typesort, types, date }) => {
  const [page, setPage] = useState(1)
  const [typesL, setTypesL] = useState()
  const { isHandlingRequest, data, error } = useFetchManager('/api/getapts', { creator: creator, sortby: sortBy, claimed: showclaimed, typesort: typesort, page: page, day: date ? date.d : 0, month: date ? date.m : 0 }, 'GET')

  useEffect(() => {
    setPage(1)
  }, [showclaimed, typesort, date])
  
  useEffect(() => {
    if(types !== undefined) {
      var arrToAdd = {}
      types.forEach(t => {
        arrToAdd[t.id] = {...t}
      })
      setTypesL(arrToAdd)
    }
  }, [types])

  if (isHandlingRequest) return (
    <div>
      Loading
    </div>
  )
  
  if (error) return <div>{error}</div>
  if (data && data.count === 0 && !isHandlingRequest) return <div>No appointments scheduled..</div>
  if (data && types)
    return (
      <>
        <div className='columns'>
          <div className='column is-narrow'>
            <span className='icon-text'>
              <span className='icon has-text-danger'><ion-icon name="star-outline"></ion-icon></span>
              <span>= Today</span>
            </span>
          </div>
          <div className='column'>
            <span className='icon-text'>
              <span className='icon'><ion-icon name="checkbox-outline"></ion-icon></span>
              <span>= Claimed</span>
            </span>
          </div>
          <div className='column is-narrow'>
            <span className='icon-text'>
              <span className='icon'><ion-icon name="add-outline"></ion-icon></span>
              <span>Click boxes to expand</span>
            </span>
          </div>
        </div>
        <div className='columns is-multiline'>
          { 
            data.rows.map(d => {
                return <Appointment type={ typesL ? typesL[d.aptType] : false } key={d.id} a={d}/>
            })
          }
          </div>
          <AptPage page={page} setPage={setPage} results={data.count}/>
          
      </>
    )
}


export default AptListv2;