const model = require('../../orm/index');


export default async function handler(req, res) {

    const creatorID = await model.Users.findOne({ 
        where: { 
            username: req.query.creator 
        },
        attributes: [
            'id'
        ]
    });
    if (creatorID) {
        const apts = await model.Appointments.findAll({
            where: { 
               adminID: creatorID.id, 
               userEmail: { 
                   [model.op.is]: null 
               } 
           } 
       });
       if (apts) {
        res.status(200).json(apts)
       } else {
        res.status(400).send
       }
    } else {
        res.status(401).send()
    }
}