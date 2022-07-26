import { useEffect, useState } from 'react';
import Appointment from '../components/appointment';
const dayjs = require('dayjs');

const AptList = ({ apts, sortBy, claimedSort }) => {
  const [appointments, setAppointments] = useState();
  const [sortedApts, setSortedApts] = useState();
  const deleteSelf = id => {
    setSortedApts(sortedApts.filter(a => a.id !== id))
  }
  useEffect(() => {
    if (apts) {
      setAppointments(apts)
    }
  }, [apts]);
  
  useEffect(() => {
    const sortApts = (sb, fb) => {
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

        if (fb === 'c') {
          return srt.filter(a => a.userEmail)
        } else if(fb === 'uc') {
          return srt.filter(a => !a.userEmail)
        }
        return srt;
      }
    }

    if(appointments && sortBy) {
      const sorted = sortApts(sortBy, claimedSort);
      setSortedApts([...sorted])
    }
  }, [appointments, sortBy, claimedSort])

  return (
    <>
    {
      sortedApts ? sortedApts.map((a, i) => <Appointment key={i} a={a} deleteSelf={deleteSelf}/>) : <>No appointments match your search</>
    }
    </>
  )
}


export default AptList;