
import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
const model = require('../../orm/index')

export default async function handler(req, res) {
    const { adminID, aptID } = req.body
    const cook = req.headers.cookie;
    const parsed = cookie.parse(cook)
    const auth = await verifyJWT(parsed.token, req.body.adminID);
    if (auth.auth && auth.act === 'admin' && auth.id === adminID) {
        const apt = await model.Appointments.findOne({where: { id: aptID }})
        if(apt && apt.adminID === adminID) {
            const deleted = await model.Appointments.destroy({ where: { id: aptID }})
            if(deleted > 0) {
                res.status(200).send()
            }
        } else {
            res.status(400).send()
        }
    } else {
        res.status(402).send()
    }
}