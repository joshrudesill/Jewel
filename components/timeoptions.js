import { useEffect, useState } from 'react';

const dayjs = require('dayjs');

const TimeOptions = () => {
    const [times, setTimes] = useState([])
    useEffect(() => {
        var t = []
        for (let i = 0; i < 96; i++) {
            const dta = dayjs()
                .set('hour', 0)
                .set('minute', 0)
                .set('second', 0)
                .add(i * 15, 'minute')
            t.push(dta.format('H:mm'))
        }
        setTimes(t)
    }, [])
    return (
        <>
            {
                times ? times.map(t => <option key={t} value={t}>{t}</option>) : <></>
            }
        </>
    )
} 

export default TimeOptions;