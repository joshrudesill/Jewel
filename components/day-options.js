import { useEffect, useState } from "react"
import dayjs from "dayjs";

const DayOptions = ({ month, setday, day, optionsOnly = false, setValue }) => {
    const [days, setDays] = useState([])

    useEffect(() => {
        if (month) {
            var now = dayjs()
            const cd = now.date()
            const cm = now.month()
            const m = dayjs().month(month).daysInMonth()
            var a = Array.from(Array(m).keys())
            if(cm === parseInt(month)) {
                a.splice(0, cd-1)
            }
            setDays(a)
        }
    }, [month])

    useEffect(() => {
        if(setday) {
            setday(days[0])
        } else if(setValue) {
            setValue('day', days[0])
        }
    }, [days])
    

    if (!optionsOnly) return (
        <div className="select">
            <select onChange={e => setday(e.target.value)} value={day}>
                { days ? days.map(d => <option key={d} value={d}>{d+1}</option>) : <></>}
            </select>
        </div>
    ) 
    if(optionsOnly) {
        return (
            <> 
                { days ? days.map(d => <option key={d} value={d}>{d+1}</option>) : <></>}
            </>
        )
    }
}


export default DayOptions;