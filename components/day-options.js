import { useEffect, useState } from "react"
import dayjs from "dayjs";

const DayOptions = ({ month, setday }) => {
    const [days, setDays] = useState([])

    useEffect(() => {
        if (month) {
            const m = dayjs().month(month).daysInMonth()
            const a = Array.from(Array(m).keys())
            setDays(a)
        }
    }, [month])
    return (
        <div className="select">
            <select onChange={e => setday(e.target.value)}>
                { days ? days.map(d => <option value={d}>{d+1}</option>) : <></>}
            </select>
        </div>
    )
}


export default DayOptions;