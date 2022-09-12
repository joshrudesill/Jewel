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
    const type = parseInt(req.query.typesort)
    var params = { 
      adminID: auth.id, 
      startTime: { [model.op.gte]: dayjs().toDate() }
    }
    
    if(claimed === 'c') {
      params.userEmail = { [model.op.not]: null }
    } else if (claimed === 'uc') {
      params.userEmail = { [model.op.is]: null }
    }
    if(type !== 0) {
      params.aptType = type
    }
    
    const apts = await model.Appointments.findAndCountAll(
      { where: params, 
        order: [
          ['startTime' , sortby]
        ],
        offset: (pages - 1) * 10,
        limit: 10,
        attributes: { exclude: ['message'] }
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