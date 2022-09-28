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
    console.log(tz)
    const current = dayjs().tz(tz)
    const start = dayjs(startTime).tz(tz)
    const end = dayjs(endTime).tz(tz)
    var formattedDate = ''
    if (start.date() === current.date() && start.month() === current.month()) {
      formattedDate = `Today, ${start.format('H:mm')} to ${end.format('H:mm')}`
    } else {
      formattedDate = `${start.format('ddd, MMM. D H:mm')} to ${end.format('H:mm')}`
    }
    setDate(formattedDate)
  }, [startTime, endTime])
  return (
    <span>{date}</span>
  )
}

export default AptDate;