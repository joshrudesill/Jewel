const model = require('../../orm/index')


export default async function handler(req, res) {
  const user = await model.Users.findOne({ where: { username: req.body.username } })
  if(!user) {
    const createdUser = await model.Users.create({
      username: req.body.username,
      password: req.body.password,
      accountType: req.body.accountType
    });
    if (createdUser) {
      res.status(200).send()
    } else {
      res.status(401).send()
    }
  }
}