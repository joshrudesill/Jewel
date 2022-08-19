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
    var params = { 
      adminID: auth.id, 
      //startTime: { [model.op.gte]: dayjs().toDate() }
    }
    
    if(claimed === 'c') {
      params.userID = { [model.op.not]: null }
    } else if (claimed === 'uc') {
      params.userID = { [model.op.is]: null }
    }

    const apts = await model.Appointments.findAll(
      { where: params, 
        order: [
          ['startTime' , sortby]
        ]
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