const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyJWT = (token, username) => {
  var tor = {}
  jwt.verify(token, process.env.secret, (err, decoded) => {
    if(err) {
      console.log(err)
      tor.auth = false
    }
    if (decoded.u === username) {
      tor.auth = true
      tor.username = username
      tor.id = decoded.id
      return tor
    } else {
      tor.auth = false
    }
  })
  return tor
}

module.exports = { verifyJWT }