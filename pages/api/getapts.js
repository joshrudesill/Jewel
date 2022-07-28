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

export default async function handler(req, res) {
  console.log(req)
  const cook = req.headers.cookie;
  const parsed = cookie.parse(cook)
  const auth = await verifyJWT(parsed.token, req.query.creator)
  console.log(auth)
  if(auth.auth && auth.act === 'admin' && auth.username === req.query.creator) {
    const apts = await model.Appointments.findAll({ where: { adminID: auth.id }})
    if (apts) {
        res.status(200).json(apts)
    } else {
      console.log('1');
      res.status(400).send()
    }
  } else {
    console.log('2');
    res.status(401).send()
  }
}