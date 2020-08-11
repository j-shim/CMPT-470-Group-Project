const express = require('express')
const router = express.Router()
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

// routes
router.post('/authenticate', authenticate)
router.post('/register', register)
router.post('/current-user', getCurrentUser)
router.post('/edit-profile', editProfile)

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

  if (username.length < 3) {
    return res.status(400).json({
      message: 'Username must be at least 3 characters'
    })
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters'
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

function getCurrentUser(req, res, next) {
  const authorization = req.headers.authorization
  const token = authorization.split(' ')[1]

  jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
    if (err) return next(err)
    const username = decoded.sub

    User.query(qb => {
      qb.where('username', username)
      qb.select('firstname', 'lastname')
    }).fetchAll()
      .then((results) => {
        const firstname = results.toJSON()[0].firstname
        const lastname = results.toJSON()[0].lastname
        return res.json({
          firstname,
          lastname
        })
      }).catch(err => {
        return next(err)
      })
  })
}

function editProfile(req, res, next) {
  const {
    firstname,
    lastname,
    password0,
    password1,
    password2
  } = req.body

  if (!firstname || !lastname || !password0 || !password1 || !password2) {
    return res.status(400).json({
      message: 'Please enter all fields'
    })
  }

  if (password1.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters'
    })
  }

  if (password0 === password1) {
    return res.status(400).json({
      message: 'New password must be different from current password'
    })
  }

  if (password1 !== password2) {
    return res.status(400).json({
      message: 'Passwords do not match'
    })
  }

  const authorization = req.headers.authorization
  const token = authorization.split(' ')[1]

  jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
    if (err) return next(err)
    const username = decoded.sub

    User.query(qb => {
      qb.where('username', username)
    })
      .fetchAll()
      .then(results => {
        if (results && results.length === 0) {
          return res.status(400).json({
            message: 'Username does not exist'
          })
        }

        resultsJSON = results.toJSON()
        hash = resultsJSON[0].hash
        if (bcrypt.compareSync(password0, hash)) {
          //hash password
          const salt = bcrypt.genSaltSync(10)
          const newHash = bcrypt.hashSync(password1, salt)

          const token = jwt.sign(
            { sub: username },
            config.JWT_SECRET,
            { expiresIn: '1h' }
          )

          User.where({ username }).save({
            firstname: firstname,
            lastname: lastname,
            hash: newHash
          }, { method: 'update' }).then(() => {
            return res.json({ token })
          }).catch(err => next(err))
        } else {
          return res.status(400).json({
            message: 'Password is incorrect'
          })
        }
      })
      .catch(err => {
        return next(err)
      })
  })
}