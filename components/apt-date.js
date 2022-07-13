import { useEffect, useState } from "react";
const dayjs = require('dayjs');

const AptDate = ({ startTime, endTime }) => {
  const [date, setDate] = useState('')
  useEffect(() => {
    const current = dayjs()
    const start = dayjs(startTime)
    const end = dayjs(endTime)
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