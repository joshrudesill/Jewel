import { useEffect, useState } from "react";
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
dayjs.extend(utc)
dayjs.extend(timezone)

const AptIcon = ({ startTime }) => {
  const [isToday, setIsToday] = useState(false)
  useEffect(() => {
    const djs = dayjs()
    const start = dayjs(startTime).utc()
    if(start.isSame(djs, 'day') && start.isSame(djs, 'month')) {
      setIsToday(true)
    }
  }, [startTime])
  return (
    <>
    {
      isToday 
      ? 
      <span className='icon is-size-4 has-text-danger'><ion-icon name="alert-outline" ></ion-icon></span> 
      : 
      <span></span>
    }
    </>
  )
}

export default AptIcon;