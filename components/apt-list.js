import { useEffect, useState } from 'react';
import Appointment from '../components/appointment';
const dayjs = require('dayjs');

const AptList = ({ apts, sortBy }) => {
  const [appointments, setAppointments] = useState();
  const [sortedApts, setSortedApts] = useState();
  useEffect(() => {
    if (apts) {
      setAppointments(apts)
    }
  }, [apts]);

  useEffect(() => {
    console.log('sorting')
    const sortApts = sb => {
      if(sb === 'dd' || sb === 'da') {
        const srt = appointments.sort(
          (a, b) => {
            const stA = dayjs(a.startTime);
            const stB = dayjs(b.startTime);
            if(stA.isBefore(stB)) {
              return -1
            } else if(stA.isAfter(stB)) {
              return 1
            } else {
              return 0
            }
          }
        )
        if(sb === 'dd') {
          srt.reverse()
        }
        return srt;
      }
    }

    if(appointments && sortBy) {
      const sorted = sortApts(sortBy);
      setSortedApts([...sorted])
    }
  }, [appointments, sortBy])

  return (
    <>
    {
      sortedApts ? sortedApts.map((a, i) => <Appointment key={i} a={a} />) : ''
    }
    </>
  )
}


export default AptList;