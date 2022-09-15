import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
import dayjs from "dayjs";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
var isBetween = require('dayjs/plugin/isBetween')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
const model = require('../../orm/index')

const verifyApt = async ( aid, start, end, tz ) => {
    const apts = await model.Appointments.findAll({ 
        where: { 
            adminID: aid,
            startTime: {
                [model.op.gte]: dayjs(start)
                    .tz(tz)
                    .set('hour', 0)
                    .set('minute', 0)
                },
            endTime: {
                [model.op.lte]: dayjs(end)
                    .tz(tz)
                    .set('hour', 23)
                    .set('minute', 59)
                }
            }
        });
    if(apts.length === 0) return true
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
    const { day, duration, month, type, time } = req.body.watchFields;
    const tz = req.body.tz
    const cook = req.headers.cookie;
    const parsed = cookie.parse(cook)
    const auth = await verifyJWT(parsed.token, req.body.username)
    if (auth.auth && auth.act === 'admin') {
        const hm = dayjs(time, 'H:mm')
        const hour = hm.utc(true).get('hour')
        const minute = hm.utc(true).get('minute')
        const start = dayjs()
            .set('year', dayjs().year())
            .set('month', month)
            .set('date', day)
            .set('hour', hour)
            .set('minute', minute)
        const end = start.add(duration, 'm')
        const result = await verifyApt(auth.id, start.utc(true), end.utc(true), tz)
        if (result) {
            const create = await model.Appointments.create({
                userId: null,
                adminID: auth.id,
                startTime: start.utc(true).toDate(),
                endTime: end.utc(true).toDate(), 
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