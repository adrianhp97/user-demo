const createError = require('http-errors')

/**
 * Function to check user session
 *
 * @param {object} req - A Request object
 * @param {object} _ - Arbitrary response object
 * @param {next} next - Function to call next action
 */
async function checkUserSession (req, _, next) {
  if (!req.user) {
    return next(createError(403, 'Not yet login.'))
  }
  next()
}

module.exports = {
  checkUserSession
}
