const model = require('../../orm/index')


export default async function handler(req, res) {
    const apts = await model.Appointments.findAll({
        where: {
            adminID: 1
        }
    })

    const messages = [
        'Looking forward to this appointment, see you then!',
        'I will be bringing my daughter, is there a place for her to sit?',
        'See you then',
        "I have a custom request for you. We'll discuss then",
        'I might be 5 minutes late',
        'If I arrive slightly early can we start early? Thanks',
        'Thanks!'
    ]
    //7
    const names = [
        'mathew',
        'alex',
        'josh',
        'celia',
        'oliver',
        'oscar',
        'ody',
        'al',
        'carmen',
        'lisa',
        'brian',
        'taylor',
        'nellie',
        'marlo',
        'ruby',
        'willow',
        'nova',
        'ayla',
        'angel'
    ]
    //19

    apts.forEach(async a => {
        
        if((Math.floor(Math.random() * 4) + 1) % 4 === 0) {
            const name = names[Math.floor(Math.random() * 17)]
            const email = `${name}${Math.floor(Math.random() * 1000)}@email.com`
            const up = await model.Appointments.update({
                userEmail: email
            }, {
                where: {
                    id: a.id
                }
            })
            if((Math.floor(Math.random() * 4) + 1) % 2 === 0) {
                const message = messages[Math.floor(Math.random() * 7)]
                const upm = await model.Appointments.update({
                    message: message
                }, {
                    where: {
                        id: a.id
                    }
                })
            }
        }
    })
    res.status(200).send()
}