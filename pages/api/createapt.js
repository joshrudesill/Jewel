import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
const model = require('../../orm/index')

export default async function handler(req, res) {
    const { minute, hour, day, duration, month } = req.body;
    const cook = req.headers.cookie;
    const parsed = cookie.parse(cook)
    const auth = await verifyJWT(parsed.token, req.body.username)

    if (auth.auth && auth.act === 'admin') {
        const dn = new Date()
        const year = dn.getFullYear();
        const start = new Date(year, month, day, hour, minute, 0, 0);
        const end = new Date(start.getTime() + duration * 60000);
        console.log(start)
        const apt = await model.Appointments.findOne({ where: { startTime: start, endTime: end }});
        if (!apt) {
            const create = await model.Appointments.create({
                userId: null,
                adminID: auth.id,
                startTime: start,
                endTime: end
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