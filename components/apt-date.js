import { useEffect, useState } from "react";
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
dayjs.extend(utc)
dayjs.extend(timezone)

const AptDate = ({ startTime, endTime }) => {
  const [date, setDate] = useState('')
  useEffect(() => {
    const tz = dayjs.tz.guess()
    const current = dayjs().tz(tz, true)
    const start = dayjs(startTime).tz(tz, true)
    const end = dayjs(endTime).tz(tz, true)
    var formattedDate = ''
    if (start.utc().date() === current.utc().date() && start.utc().month() === current.utc().month()) {
      formattedDate = `Today, ${start.utc().format('H:mm')} to ${end.utc().format('H:mm')}`
    } else {
      formattedDate = `${start.utc().format('ddd, MMM. D H:mm')} to ${end.utc().format('H:mm')}`
    }
    setDate(formattedDate)
  }, [startTime, endTime])
  return (
    <span>{date}</span>
  )
}

export default AptDate;