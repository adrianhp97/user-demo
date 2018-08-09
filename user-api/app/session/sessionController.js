const passport = require('../helpers/passport')
const createError = require('http-errors')
const config = require('config')

/**
 * Function for logging in.
 * It will create a session that will be stored in Redis.
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Function to call next action
 * @returns {object} A Response object with the session
 */
async function loginController (req, res, next) {
  await passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(createError(500, err.message))
    }
    if (!user) {
      return next(createError(404, info))
    }
    // set session with the user
    req.session.passport = { user: user.email }
    res.send(user)
  })(req, res, next)
}

/**
 * Function for logging out.
 * It will destroy the current user session.
 *
 * @param {object} req - A Request object
 * @param {object} res - A Response object
 * @param {object} next - Function to call next action
 * @returns {object} A Response object with no user cookie
 */
async function logoutController (req, res, next) {
  // Clear the cookie first, then destroy the session
  await res.clearCookie(config.get('session-key'))
  await req.session.destroy((err) => {
    if (err) {
      return next(createError(500, err))
    } else {
      return res.send('success')
    }
  })
}

module.exports = {
  loginController,
  logoutController
}
