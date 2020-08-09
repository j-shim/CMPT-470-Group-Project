const express = require('express')
const router = express.Router()
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

// routes
router.post('/authenticate', authenticate)
router.post('/register', register)

module.exports = router

function authenticate(req, res, next) {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      message: 'Please enter all fields'
    })
  }

  User.query(qb => {
    qb.where('username', username)
  })
    .fetchAll()
    .then(results => {
      if (results && results.length === 0) {
        return res.status(400).json({
          message: 'Username or password is incorrect'
        })
      }

      resultsJSON = results.toJSON()
      hash = resultsJSON[0].hash
      if (bcrypt.compareSync(password, hash)) {
        const token = jwt.sign({
          sub: username
        }, config.JWT_SECRET, {
          expiresIn: '1h'
        })
        return res.json({
          token
        })
      } else {
        return res.status(400).json({
          message: 'Username or password is incorrect'
        })
      }
    })
    .catch(err => {
      return next(err)
    })
}

function register(req, res, next) {
  const {
    firstname,
    lastname,
    username,
    password,
    password2
  } = req.body

  if (!firstname || !lastname || !username || !password || !password2) {
    return res.status(400).json({
      message: 'Please enter all fields'
    })
  }

  if (password !== password2) {
    return res.status(400).json({
      message: 'Passwords do not match'
    })
  }

  User.query(qb => {
    qb.where('username', username)
  })
    .fetchAll()
    .then(results => {
      if (results && results.length > 0) {
        return res.status(400).json({
          message: 'Username ' + username + ' is already taken'
        })
      }

      //hash password
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      User.forge({
        firstname,
        lastname,
        username,
        hash
      }).save()
        .then(result => {
          console.log(result)
          return res.json({})
        })
        .catch(err => {
          return next(err)
        })
    })
    .catch(err => {
      return next(err)
    })
}