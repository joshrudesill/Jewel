import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
import dayjs from "dayjs";
const model = require('../../orm/index')

export default async function handler(req, res) {
    const { minute, hour, day, duration, month } = req.body;
    console.log("DAY:" , day)
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
        console.log(start)
        const apt = await model.Appointments.findOne({ where: { startTime: start, endTime: end }});
        if (!apt) {
            const create = await model.Appointments.create({
                userId: null,
                adminID: auth.id,
                startTime: start.toDate(),
                endTime: end.toDate()
            });
            if(create) {
                res.status(200).send();
            } else {
                res.status(401).send();
            }
        } else {
            res.status(401).send();
        }
    } else {
        res.status(400).send();
    }
}