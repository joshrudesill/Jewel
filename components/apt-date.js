import { useEffect, useState } from "react";
const dayjs = require('dayjs');

const AptDate = ({ startTime }) => {
  const [date, setDate] = useState('')
  useEffect(() => {
    const current = dayjs()
    const start = dayjs(startTime)
    var formattedDate = ''
    if (start.date() === current.date() && start.month() === current.month()) {
      formattedDate = `Today, ${start.format('H:mm')}`
    } else {
      formattedDate = `${start.format('ddd, MMM. D HH:mm')}`
    }
    setDate(formattedDate)
  }, [startTime])
  return (
    <span>{date}</span>
  )
}

export default AptDate;