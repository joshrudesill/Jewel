const dayjs = require('dayjs');
const model = require('../../orm/index')
const queryInterface = model.sequelize.getQueryInterface()
import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)


export default async function handler(req, res) {

    const parsed = cookie.parse(req.headers.cookie)
    const auth = await verifyJWT(parsed.token, req.body.creator)
    if(auth.auth && auth.act === 'admin' && auth.username === req.body.creator) {
        const { 
            days, 
            from, 
            to , 
            efrom,
            eto, 
            type, 
            length, 
            nextunit, 
            nextamount 
        } = req.body.watchFields;
        
        const dayMap = {
            'su': 0,
            'mo': 1, 
            'tu': 2, 
            'we': 3, 
            'th': 4, 
            'fr': 5, 
            'sa': 6, 
        }

        var daysOfWeek = []
        Object.keys(days).forEach(d => {
            if (days[d]) {
                daysOfWeek.push(dayMap[d])
            }
        })

        console.log(daysOfWeek)

        const fh = from.substring(0, from.indexOf(':'))
        const fm =  from.substring(from.indexOf(':') +1, from.length)
        const th =  to.substring(0, to.indexOf(':'))
        const tm = to.substring(to.indexOf(':') +1, to.length)

        const efh = efrom.substring(0, efrom.indexOf(':'))
        const efm = efrom.substring(efrom.indexOf(':') +1, efrom.length)
        const eth =  eto.substring(0, eto.indexOf(':'))
        const etm = eto.substring(eto.indexOf(':') +1, eto.length)
    
        const fromTime = dayjs().set('hour', parseInt(fh)).set('minute', fm).second(0).millisecond(0)
        const toTime = dayjs().set('hour', th).set('minute',  tm).second(0).millisecond(0)
        const currentTime = dayjs()


        const aptsToDelete = await model.Appointments.findAll({
            where: {
                adminID: auth.id,
                startTime: { [model.op.gte]: dayjs().hour(0).minute(0).toDate() }
            }
        })
        var toDeleteIDs = []

        aptsToDelete.forEach(a => {
            const time = dayjs(a.startTime)
            const from = dayjs(a.startTime).hour(fh).minute(fm)
            const to = dayjs(a.startTime).hour(th).minute(tm)

            if(!daysOfWeek.includes(time.day())) {
                if(time.isBetween(from, to)) {
                    toDeleteIDs.push(a.id)
                }
            }
        })

        
        const timeDiffInMin = toTime.diff(fromTime, 'minute')
        const numAptsInPeriod = Math.floor(timeDiffInMin / length)
        var numberOfDays = 0
        if(nextunit === 'week') {
            numberOfDays = nextamount * 7
        }
        if(nextunit === 'month') {
            numberOfDays = nextamount * 30
        }
        console.log(numberOfDays)
        var aptsToAdd = []
        var loopStartTime = fromTime
        for(let j = 0; j < numberOfDays; j++) {
            if(j !== 0) {
                loopStartTime = loopStartTime.add(1, 'day')
            }
            if(daysOfWeek.includes(loopStartTime.day())) {
                for(let i = 0; i < numAptsInPeriod; i++) {
                    const time = loopStartTime.add(length * i, 'minutes')
                    const efrom = dayjs(loopStartTime).hour(efh).minute(efm)
                    const eto = dayjs(loopStartTime).hour(eth).minute(etm)
                    if(!time.isBetween(efrom, eto) && !time.add(length, 'minutes').isBetween(efrom, eto)) {
                        var apt = {
                            userID: null,
                            adminID: auth.id,
                            startTime: time.utc(true).toDate(),
                            endTime: time.utc(true).add(length, 'minutes').toDate(),
                        }
                        if(type !== 0) {
                            apt.aptType = type
                        }
                        aptsToAdd.push(apt)
                    } else {
                        
                    }
               }
            }
        }

        if(aptsToAdd.length > 0) {
            const newSchedule = await model.Appointments.bulkCreate(aptsToAdd)
            if(newSchedule) {
                res.status(200).send()
            } else {
                res.status(400).send()
            }
        } else {
            res.status(404).send()
        }
    } else {
        res.status(401).send()
    }

}