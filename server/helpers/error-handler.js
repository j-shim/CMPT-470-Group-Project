module.exports = errorHandler

function errorHandler(err, req, res, next) {
  console.error(err)

  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err })
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    console.error(err.message)
    return res.status(400).json({ message: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    console.error('Invalid Token')
    return res.status(401).json({ message: 'Invalid Token' })
  }

  // default to 500 server error
  console.error(err.message)
  return res.status(500).json({ message: err.message })
}