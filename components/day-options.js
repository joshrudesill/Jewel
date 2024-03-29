import { useEffect, useState } from "react"
import dayjs from "dayjs";

const DayOptions = ({ month, setday, day, optionsOnly = false, setValue, setdate, date }) => {
    const [days, setDays] = useState()

    useEffect(() => {
        if(month === -1 || parseInt(month) === -1) {
            setDays([])
        } else {
            if (month) {
                var now = dayjs()
                const cd = now.date()
                const cm = now.month()
                const m = dayjs().month(month).daysInMonth()
                var a = Array.from(Array(m).keys())
                if(cm === parseInt(month)) {
                    a.splice(0, cd-1)
                }
                a = a.map(e => e+=1)
                setDays(a)
            }
        }
    }, [month])
    useEffect(() => {
        if(setdate) {
            const d = {d: day, m: month}
            setdate(d)
        }
    }, [day])

    useEffect(() => {
        if(month === -1 || parseInt(month) === -1) {
            const d = {d: 0, m: -1}
            setdate(d)
        } else {
            if(days) {
                if(setdate) {
                    const d = {d: days[0], m: month}
                    setdate(d)
                } else if(setValue) {
                    setValue('day', days[0])
                }
            }
        }
    }, [days])
    
    

    if (!optionsOnly) return (
        <div className="select">
            <select onChange={e => setday(e.target.value)} value={date ? date.d : 0}>
                { days ? days.map(d => <option key={d} value={d}>{d}</option>) : <></> }
            </select>
        </div>
    ) 
    if(optionsOnly) {
        return (
            <> 
                { days ? days.map(d => <option key={d} value={d}>{d}</option>) : <></>}
            </>
        )
    }
}


export default DayOptions;