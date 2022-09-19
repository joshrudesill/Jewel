import { useEffect, useState } from "react"
const dayjs = require('dayjs');

const MonthOptions = ({ reg, setVal, updateState, includeDefault = false }) => {
    const [months, setMonths] = useState()
    var register = {}
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
        if(months && setVal) {
            setVal('month', months[0].v - 1)
        }
        if(months && updateState && !includeDefault) {
            updateState(months[0].v -1)
        } else if(updateState && months && includeDefault){
            updateState(-1)
        }
    }, [months, setVal])
    if(reg) {
        register = {...reg('month')}
    }
    const onSelectChange = e => {
        if (!updateState) {
            return 
        }
        updateState(e.target.value)
    }
    return (
        <select onChange={e => onSelectChange(e)} defaultValue={dayjs().format('M') -1} {...register}>
            {
                includeDefault ? <option value={-1}>Select Month</option> : <></>
            }
            {
                months ? months.map((m, i) => <option value={m.v -1} key={m.v}>{m.m}</option>) : ''
            }
        </select>
    )
}

export default MonthOptions;