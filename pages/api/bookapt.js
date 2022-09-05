import * as cookie from 'cookie';
import { verifyAuth } from "../../auth/helpers";
const model = require('../../orm/index')

export default async function handler(req, res) {
    const { message, email } = req.body.watchFields
    const updated = await model.Appointments.update({ 
            userEmail: email,
            message: message
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
}