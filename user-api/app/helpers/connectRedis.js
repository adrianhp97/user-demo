const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const config = require('config')

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
})

const sessionStore = new RedisStore({
  client: redisClient,
  prefix: config.get('session-key')
})

const sessionMiddleware = session({
  secret: process.env.API_SECRET,
  store: sessionStore,
  saveUninitialized: false,
  resave: false,
  name: config.get('session-key')
})

module.exports = sessionMiddleware
