import { useEffect, useState } from "react";
const dayjs = require('dayjs');

const AptIcon = ({ startTime }) => {
  const [isToday, setIsToday] = useState(false)
  useEffect(() => {
    const djs = dayjs()
    const start = dayjs(startTime)
    if(start.date() === djs.date() && start.month() === djs.month()) {
      setIsToday(true)
    }
  }, [startTime])
  return (
    <>
    {
      isToday ? 
      <span className='icon is-size-4 has-text-danger'><ion-icon name="alert-outline" ></ion-icon></span> : 
      <span></span>
    }
    </>
  )
}

export default AptIcon;