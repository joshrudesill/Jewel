
const model = require('../../orm/index')


export default async function handler(req, res) {
    const adminId = await model.Users.findOne({
        where: {
            username: req.query.creator
        },
        attributes: ['id']
    });

    if(adminId) {
        const types =await model.AppointmentTypes.findAll({
            where: {
                adminID: adminId.id
            },
            attributes: [
                'id', 'typeName', 'typeDescription', 'price', 'defaultTime'
            ]
        });
        if(types) {
            res.status(200).json(types)
        } else {
            res.status(401).send()
        }
    } else {
        res.status(400).send()
    }
}