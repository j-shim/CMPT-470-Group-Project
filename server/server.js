// https://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management#server-js

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')
const userMoviesRouter = require('./routes/user_movie_items')
const movieListRouter = require('./routes/movie_list')

const jwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
const config = require('./config/config')

const app = express()

app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(jwt())

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)
app.use('/user-movie-items', userMoviesRouter)
app.use('/movie-list', movieListRouter)

app.use(errorHandler)

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : config.PORT
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port)
})