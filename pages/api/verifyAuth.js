const jwt = require('jsonwebtoken');
require('dotenv').config()

export default async function handler(req, res) {
    const token = req.cookies.token;
    if(!token) {
        res.status(401).send()
    } else {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (decoded.u === req.body.username) {
                res.status(200).json({username: decoded.u, id: decoded.id, act: decoded.act})
            } else {
                res.status(401).json()
            }
        })
    }
}