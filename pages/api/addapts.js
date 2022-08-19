import dayjs from 'dayjs';

const model = require('../../orm/index')

export default async function handler(req, res) {
    console.log('asdfasyhe')
    var ata = [];
    for(let i = 0; i < 200; i++) {
        var o = {
            userId: null,
            adminID: 46,
            startTime: dayjs().add(Math.floor(Math.random() * 300), 'minute').toDate(),
            endTime: dayjs().add(Math.floor(Math.random() * 300), 'minute').toDate()
        }
        ata.push(o)
    }

    const create = await model.Appointments.bulkCreate(ata);
}