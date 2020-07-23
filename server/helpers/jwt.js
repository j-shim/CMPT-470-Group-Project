const expressJwt = require('express-jwt')
const config = require('../config/config')
// const db = require('./db')
const User = require('../models/user')

module.exports = jwt

function jwt() {
  const secret = config.JWT_SECRET
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked
  }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register'
    ]
  })
}

async function isRevoked(req, payload, done) {
  const results = await User.query(qb => {
    qb.where('username', payload.sub)
  }).fetchAll()

  if (results && results.length === 0) {
    return done(null, true)
  }

  done()

  // db.query('SELECT * FROM user WHERE username = ?',
  //   [payload.sub],
  //   (err, results, fields) => {
  //     if (err)
  //       return done(null, true)

  //     if (results && results.length === 0)
  //       return done(null, true)

  //     done()
  //   }
  // )
}