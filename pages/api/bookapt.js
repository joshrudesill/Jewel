import * as cookie from 'cookie';
import { verifyAuth } from "../../auth/helpers";
const model = require('../../orm/index')

export default async function handler(req, res) {
    const cook =  req.headers.cookie;
    const parsed = cookie.parse(cook)
    var authen = await verifyAuth(parsed.token)
    if(authen.auth) {
        console.log(authen)
        const updated = await model.Appointments.update({ 
            userEmail: authen.username,
            userID: authen.id
          }, {
            where: {
                id: req.body.aID
            }
          })
        if (updated) {
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    } else {
        res.status(401).send()
    }
}