import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
import dayjs from "dayjs";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)
const model = require('../../orm/index')

const verifyApt = async ( aid, start, end, tz ) => {
    const apts = await model.Appointments.findAll({ where: { adminID: aid }});
    const adjustedTime = dayjs(start).tz(tz);
    const currentTime = dayjs().tz(tz);
    if(currentTime.utc(true).isAfter(adjustedTime, 'minute')) return false
    
    for(let i = 0; i < apts.length; i++) {
        if(start.isBetween(apts[i].startTime, apts[i].endTime, 'minute', '[)')) return false
        
        if(end.isBetween(apts[i].startTime, apts[i].endTime, 'minute', '(]')) return false
        
        if(dayjs(apts[i].startTime).isBetween(start, end, 'minute', '[]')) return false
            
        if(dayjs(apts[i].endTime).isBetween(start, end, 'minute', '[]')) return false
    }
    return true
}

export default async function handler(req, res) {
    const { minute, hour, day, duration, month, type } = req.body.watchFields;
    const tz = req.body.tz
    const cook = req.headers.cookie;
    const parsed = cookie.parse(cook)
    const auth = await verifyJWT(parsed.token, req.body.username)
    if (auth.auth && auth.act === 'admin') {
        const start = dayjs()
            .set('year', dayjs().year())
            .set('month', month)
            .set('date', day)
            .set('hour', hour)
            .set('minute', minute)
        const end = start.add(duration, 'm')
        const result = await verifyApt(auth.id, start, end, tz)
        if (result) {
            const create = await model.Appointments.create({
                userId: null,
                adminID: auth.id,
                startTime: start.toDate(),
                endTime: end.toDate(), 
                aptType: type
            });
            if(create) {
                res.status(201).send();
            } else {
                res.status(400).send();
            }
        } else {
            res.status(401).send();
        }
    } else {
        res.status(403).send();
    }
}