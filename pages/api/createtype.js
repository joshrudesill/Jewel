import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
const model = require('../../orm/index')

export default async function handler(req, res) {
    const cook = req.headers.cookie;
    const parsed = cookie.parse(cook)
    const auth = await verifyJWT(parsed.token, req.body.admin)
    if (auth.auth && auth.act === 'admin') {
        const types = await model.AppointmentTypes.findAll({
            where: {
                adminID: auth.id
            }
        });

        const { tname, tdesc, price, dtime } = req.body.watchFields;
        
        const unique = types.every(t => t.typeName.toLowerCase() !== tname.toLowerCase())
        
        if(unique) {
            const newType = await model.AppointmentTypes.create({
                adminID: auth.id,
                typeName: tname,
                typeDescription: tdesc,
                price: price,
                defaultTime: dtime
            });

            if(newType) {
                res.status(200).send()
            } else {
                res.status(401).send()
            }
        } else {
            res.status(402).send()
        }
    }
}