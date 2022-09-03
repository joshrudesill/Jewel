import dayjs from 'dayjs';

const model = require('../../orm/index')

export default async function handler(req, res) {
    var ata = [];
    for(let i = 0; i < 15000; i++) {
        var s = dayjs().add(Math.floor(Math.random() * 70000), 'minute')
        var e = s.add(Math.floor(Math.random() * 120), 'minute')
        var id = Math.floor(Math.random() * 1500)
        if(id === 46) {
            id = 47
        }
        var o = {
            userId: null,
            adminID: id,
            startTime: s.toDate(),
            endTime: e.toDate()
        }
        ata.push(o)
    }

    const create = await model.Appointments.bulkCreate(ata);
}