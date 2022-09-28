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

        const fh = from.substring(0, from.indexOf(':'))
        const fm =  from.substring(from.indexOf(':') +1, from.length)
        const th =  to.substring(0, to.indexOf(':'))
        const tm = to.substring(to.indexOf(':') +1, to.length)

        const currentTime = dayjs()
        const fromTime = currentTime.set('hour', parseInt(fh)).set('minute', fm).second(0).millisecond(0)
        const toTime = currentTime.set('hour', th).set('minute',  tm).second(0).millisecond(0)


        const aptsToDelete = await model.Appointments.findAll({
            where: {
                adminID: auth.id,
                startTime: { [model.op.gte]: currentTime.utc() }
            }
        })

        var toDeleteIDs = []
        aptsToDelete.forEach(a => {
            const timet = dayjs(a.startTime)
            const time = timet.utc()
            const endtime = time.add(length, 'minutes')
            const from = dayjs(a.startTime).hour(fh).minute(fm)
            const to = dayjs(a.startTime).hour(th).minute(tm)

            if(daysOfWeek.includes(time.day())) {
                if(time.isBetween(from.utc(), to.utc(), 'minute', '[]') || endtime.utc().isBetween(from.utc(), to.utc(), 'minute', '[]')) {
                    toDeleteIDs.push(a.id)
                } 
            }
        })

        const deleted = await queryInterface.bulkDelete('appointments', {
            id: {
                [model.op.in]: toDeleteIDs
            }
        });
        
        const timeDiffInMin = toTime.diff(fromTime, 'minute')
        const numAptsInPeriod = Math.floor(timeDiffInMin / length)

        var numberOfDays = 0
        if(nextunit === 'week') {
            numberOfDays = nextamount * 7
        }
        if(nextunit === 'month') {
            numberOfDays = nextamount * 30
        }

        if(efrom !== 0 && eto !== 0) {
            
            var efh = efrom.substring(0, efrom.indexOf(':'))
            var efm = efrom.substring(efrom.indexOf(':') +1, efrom.length)
            var eth =  eto.substring(0, eto.indexOf(':'))
            var etm = eto.substring(eto.indexOf(':') +1, eto.length)
            const efromTime = dayjs().set('hour', parseInt(efh)).set('minute', efm).second(0).millisecond(0).utc()
            const etoTime = dayjs().set('hour', eth).set('minute',  etm).second(0).millisecond(0).utc()

            if(!efromTime.isBetween(fromTime.utc(), toTime.utc()) && !etoTime.isBetween(fromTime.utc(), toTime.utc())) {
                res.status(400).send()
            } else {
                
            const timeDiffInMin1P = efromTime.utc().diff(fromTime.utc(), 'minute')
            const numAptsIn1P = Math.floor(timeDiffInMin1P / length)
            const timeDiffInMin2P = toTime.utc().diff(etoTime.utc(), 'minute')
            const numAptsIn2P = Math.floor(timeDiffInMin2P / length)

            var aptsToAdd = []
            var loopStartTime = fromTime.utc()

            for(let j = 0; j < numberOfDays; j++) {
                if(j !== 0) {
                    loopStartTime = loopStartTime.add(1, 'day')
                }
                if(daysOfWeek.includes(loopStartTime.day())) {
                    for(let i = 0; i < numAptsIn1P; i++) {
                        const time = loopStartTime.add(length * i, 'minutes')
                        const efrom = dayjs(loopStartTime).hour(efh).minute(efm).utc()
                        const eto = dayjs(loopStartTime).hour(eth).minute(etm).utc()
                        if(!time.utc().isBetween(efrom, eto) && !time.utc().add(length, 'minutes').isBetween(efrom, eto)) {
                            var apt = {
                                userID: null,
                                adminID: auth.id,
                                startTime: time.utc().toISOString(),
                                endTime: time.utc().add(length, 'minutes').toISOString(),
                            }
                            if(type !== 0) {
                                apt.aptType = type
                            }
                            aptsToAdd.push(apt)
                        }
                    }

                    const diff = etoTime.diff(fromTime, 'minute')
                    const loopStartTime2P = loopStartTime.add(diff, 'minutes')

                    for(let y = 0; y < numAptsIn2P; y++) {
                        const time = loopStartTime2P.add(length * y, 'minutes')
                        const efrom = dayjs(loopStartTime2P).hour(efh).minute(efm).utc()
                        const eto = dayjs(loopStartTime2P).hour(eth).minute(etm).utc()
                        if(!time.utc().isBetween(efrom, eto) && !time.add(length, 'minutes').utc().isBetween(efrom, eto, null, '()')) {
                            var apt = {
                                userID: null,
                                adminID: auth.id,
                                startTime: time.utc().toISOString(),
                                endTime: time.utc().add(length, 'minutes').toISOString(),
                            }
                            if(type !== 0) {
                                apt.aptType = type
                            }
                            aptsToAdd.push(apt)
                        } else {
                            
                        }
                   }
                }
            }}

        } else {

            var aptsToAdd = []
            var loopStartTime = fromTime.utc()
            for(let j = 0; j < numberOfDays; j++) {
                if(j !== 0) {
                    loopStartTime = loopStartTime.add(1, 'day')
                }
                if(daysOfWeek.includes(loopStartTime.day())) {
                    for(let i = 0; i < numAptsInPeriod; i++) {
                        const time = loopStartTime.add(length * i, 'minutes')
                        var apt = {
                            userID: null,
                            adminID: auth.id,
                            startTime: time.utc().toISOString(),
                            endTime: time.utc().add(length, 'minutes').toISOString(),
                        }
                        if(type !== 0) {
                            apt.aptType = type
                        }
                        aptsToAdd.push(apt)
                   }
                }
            }
        }

        

        if(aptsToAdd && aptsToAdd.length > 0) {
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