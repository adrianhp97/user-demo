var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var config = require('config')

var app = express()

const connectRedis = require('./app/helpers/connectRedis')
const passport = require('./app/helpers/passport')
const users = require('./app/users')
const session = require('./app/session')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(connectRedis)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (_, res) => res.send(`<h1>Welcome to ${config.get('project-name')}!</h1>`))
app.use('/', session)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError.NotFound())
})

module.exports = app
