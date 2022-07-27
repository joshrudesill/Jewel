import { useEffect, useState } from 'react';
import Appointment from '../components/appointment';

const AptListv2 = ({ apts, sortBy, claimedSort }) => {
  const [appointments, setAppointments] = useState();
  useEffect(() => {
    if (apts) {
      setAppointments(apts)
    }
  }, [apts]);
  
  

  return (
    <>
    {
      appointments ? appointments.map((a, i) => <Appointment key={i} a={a}/>) : <>No appointments match your search</>
    }
    </>
  )
}


export default AptListv2;