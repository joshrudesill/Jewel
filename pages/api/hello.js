// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from 'cookie';
const model = require('../../orm/index')
export default async function handler(req, res) {
  const user = await model.Users.findOne({where : {username: '1234'}})
  
  res.status(200).json({username: user.username})
}
