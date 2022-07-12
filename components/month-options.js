import { useEffect, useState } from "react"
const dayjs = require('dayjs');

const MonthOptions = ({ reg, setVal }) => {
    const [months, setMonths] = useState()
    useEffect(() => {
        const d = dayjs()
        var ms = []
        for (let i = 0; i < 3; i++) {
            const dta = {
                m: d.add(i, 'M').format('MMMM'),
                v: d.add(i, 'M').format('M')
                }
            ms.push(dta)
        }
        setMonths(ms)
    }, [])
    useEffect(() => {
        if(months) {
            setVal('month', months[0].v - 1)
        }
    }, [months, setVal])
    return (
        <select defaultValue={dayjs().format('M') -1} {...reg('month')}>
            {
                months ? months.map((m, i) => <option value={m.v -1} key={m.v}>{m.m}</option>) : ''
            }
        </select>
    )
}

export default MonthOptions;