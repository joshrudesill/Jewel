const model = require('../../orm/index')

export default async function handler(req, res) {
    const { message, email } = req.body.watchFields;
    const { aID } = req.body;
    const check = await model.Appointments.findOne({ 
        where: {
            id: aID
        }
    })
    if(check) {
        const updated = await model.Appointments.update({
                userEmail: email,
                message: message
            }, {
                where: {
                    id: aID
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