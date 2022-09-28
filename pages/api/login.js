import { serialize } from 'cookie';
const model = require('../../orm/index')
const jwt = require('jsonwebtoken');


export default async function handler(req, res) {
  const user = await model.Users.findOne({where : {username: req.query.username}});

  if (!user) {
    res.status(401).send();
  }
  if(user.password === req.query.password) {
    const token = await jwt.sign(
      {
        u: user.username,
        id: user.id,
        act: user.accountType
      }, 
      process.env.secret)
      res.setHeader('Set-Cookie', serialize('token', token, { 
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: '250000',
          path: '/' 
        }))
      res.status(200).json(
      {
        username: user.username,
        act: user.accountType
      })
  }
}
