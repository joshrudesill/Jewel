import { useEffect, useState } from "react";
const dayjs = require('dayjs');

const AptTime = ({ start, end }) => {
  const [time, setTime] = useState('0')

  useEffect(() => {
    const s = dayjs(start)
    const e = dayjs(end)
    const diff = e.diff(s, 'minute')
    setTime(diff)
  }, [end, start])

  return (
    <span className="tag is-success is-light is-medium"><ion-icon className='is-size-5' name="stopwatch-outline"></ion-icon>{time} min</span>
  )
}

export default AptTime;