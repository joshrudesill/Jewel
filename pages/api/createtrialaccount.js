const model = require('../../orm/index')
const jwt = require('jsonwebtoken');
import { serialize } from 'cookie';

export default async function handler(req, res) {
    const trialAccount = 1;

    const appointments = await model.Appointments.findAll({
        where: {
            adminID: trialAccount
        }
    })

    const types = await model.AppointmentTypes.findAll({
        where: {
            adminID: trialAccount
        }
    })

    const random = Math.floor(Math.random() * 10000)
    const letterNum = Math.floor(Math.random() * 25)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const letter = letters[letterNum]

    console.log(`Trial${random.toString()}${letter}`)

    if(types && appointments) {
        const trialUser = await model.Users.create({
            username: `Trial${random.toString()}${letter}`,
            password: `Trial${random.toString()}${letter}`,
            accountType: 'admin',
            trialAccount: true,
            trialAccountName: req.body.watchFields ? req.body.watchFields.name : null
        })
        if(trialUser) {
            const token = await jwt.sign(
            {
              u: trialUser.username,
              id: trialUser.id,
              act: trialUser.accountType
            }, 
            process.env.secret)
            res.setHeader('Set-Cookie', serialize('token', token, { 
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: '250000',
                path: '/' 
              }))

            var aptsToAdd = []
            var typesToAdd = []

            appointments.forEach(a => {
                var ata = {
                    userId: a.userID,
                    adminID: trialUser.id,
                    startTime: a.startTime,
                    endTime: a.endTime,
                    message: a.message,
                    userEmail: a.userEmail
                }
                aptsToAdd.push(ata)
            })

            types.forEach(t => {
                var tta = {
                    adminID: trialUser.id,
                    typeName: t.typeName,
                    typeDescription: t.typeDescription,
                    price: t.price,
                    defaultTime: t.defaultTime
                }
                typesToAdd.push(tta)
            })
            
            const createdApts = await model.Appointments.bulkCreate(aptsToAdd)
            const createdTypes = await model.AppointmentTypes.bulkCreate(typesToAdd)
            if(createdApts && createdTypes) {
                res.status(200).send(JSON.stringify(trialUser.username))
            }
        } else {
            res.status(400).send()
        }
    }
}