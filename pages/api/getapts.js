import { verifyJWT } from "../../auth/helpers";
import * as cookie from 'cookie';
import dayjs from "dayjs";
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') 
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)
const model = require('../../orm/index')
//requests by page.
export default async function handler(req, res) {
  const parsed = cookie.parse(req.headers.cookie)
  const auth = await verifyJWT(parsed.token, req.query.creator)
  if(auth.auth && auth.act === 'admin' && auth.username === req.query.creator) {
    const claimed = req.query.claimed;
    const sortby = req.query.sortby === 'dd' ? 'DESC' : 'ASC'
    const pages = req.query.page;
    const { month, day } = req.query;
    const m = parseInt(month)
    const d = parseInt(day)
    const type = parseInt(req.query.typesort)
    var params = { 
      adminID: auth.id, 
      startTime: { [model.op.gte]: dayjs().utc(true).toDate() }
    }
    
    if(claimed === 'c') {
      params.userEmail = { [model.op.not]: null }
    } else if (claimed === 'uc') {
      params.userEmail = { [model.op.is]: null }
    }
    if(type !== 0) {
      params.aptType = type
    }
    if(d !== 0 && m !== 0) {
      const gt = dayjs()
            .set('year', dayjs().year())
            .set('date', day)
            .set('month', month)
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
      const lt = dayjs(gt).add(86399, 'second')
      params.startTime = {
        [model.op.and]: [
            {[model.op.gte]: gt.utc(true).toDate()},
            {[model.op.lte]: lt.utc(true).toDate()}
        ],
    }
    }
    
    const apts = await model.Appointments.findAndCountAll(
      { where: params, 
        order: [
          ['startTime' , sortby]
        ],
        offset: (pages - 1) * 10,
        limit: 10,
        
      })

    if (apts) {
        res.status(200).json(apts)
    } else {
      res.status(400).send()
    }
  } else {
    res.status(401).send()
  }
}