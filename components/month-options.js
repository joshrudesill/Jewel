import { useEffect, useState } from "react"
const dayjs = require('dayjs');

const MonthOptions = () => {
    const [months, setMonths] = useState()
    useEffect(() => {
        const d = dayjs()
        var ms = []
        const m1 = d.format('MMMM')
        const m2 = d.add(1, 'M').format('MMMM')
        const m3 = d.add(2, 'M').format('MMMM')
        ms = [m1, m2, m3]
        setMonths(ms)
    }, [])
    return (
        <>
            {
                months ? months.map(m => <option key={m}>{m}</option>) : ''
            }
        </>
    )
}

export default MonthOptions;