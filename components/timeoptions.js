import { useEffect, useState } from 'react';

const dayjs = require('dayjs');

const TimeOptions = ({ value, reg, customReg, optionsOnly }) => {
    const [times, setTimes] = useState()
    var register = {}
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


    if(reg) {
        if(customReg) {
            register = {...reg(customReg.regName, {
                validate: customReg?.options?.validate?.check !== undefined ? customReg.options.validate.check : true
            })}
        } else {
            register = {...reg('time')}
        }
    }
    if(optionsOnly) {
        return (
            <>
            <option value={0}>Select a time</option>
            {
                times ? times.map(t => <option key={t} value={t}>{t}</option>) : <></>
            }
            </>
        )
    } else {

    
    return (
        <select {...register} value={value}>
            <option value={0}>Select a time</option>
            {
                times ? times.map(t => <option key={t} value={t}>{t}</option>) : <></>
            }
        </select>
    )
    }
} 

export default TimeOptions;