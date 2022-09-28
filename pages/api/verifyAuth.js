const jwt = require('jsonwebtoken');
require('dotenv').config()

export default async function handler(req, res) {
    const token = req.cookies.token;
    const admin = req.query.admin ? 'admin' : 'standard'
    if(!token) {
        res.status(401).send()
    } else {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (decoded.u === req.query.username) {
                if(decoded.act === admin) {
                    res.status(200).send()
                } else {
                    res.status(401).send()
                }
            } else {
                res.status(401).send()
            }
        })
    }
}