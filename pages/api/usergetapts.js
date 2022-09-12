const model = require('../../orm/index');
const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
dayjs.extend(utc)
dayjs.extend(timezone)

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
        const { day, month, type, tz } = req.query;
        const d = parseInt(day)
        const m = parseInt(month)
        if (typeof d !== 'number' || typeof m !== 'number') {
            res.status(400).send()
        }
        const gt = dayjs()
            .set('year', dayjs().year())
            .set('date', d+1)
            .set('month', month)
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .tz(tz)
            
        const lt = dayjs(gt).add(86399, 'second')
        
        var params = {
            adminID: creatorID.id, 
            userEmail: { 
                [model.op.is]: null 
            },
            startTime: {
                [model.op.and]: [
                    {[model.op.gte]: gt.utc(true).toDate()},
                    {[model.op.gte]: dayjs().tz(tz).utc(true).toDate()},
                    {[model.op.lte]: lt.utc(true).toDate()}
                ],
            }
        }
        if(type !== undefined && parseInt(type) !== 0) {
            params.aptType = parseInt(type)
        }
        const apts = await model.Appointments.findAll({
            where: params,
            order: [
                ['startTime' , 'ASC']
            ]
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