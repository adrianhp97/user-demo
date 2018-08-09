const User = require('./userModel')
const createError = require('http-errors')
const bcrypt = require('bcryptjs')
const config = require('config')

const BCRYPT_STRENGTH = 8

/**
 * Function to get all users.
 *
 * @param {object} _ - Arbitrary response object
 * @param {object} res - Response object
 * @param {object} next - Function to call next action
 * @returns {object} A Response object that contains all users
 */
async function getAllUsers (_, res, next) {
  try {
    // asynchronously load the data
    const rawData = await User.findAll()
    const result = rawData.map(item => {
      // don't return the user password
      delete item.dataValues.password
      return item.dataValues
    })
    return res.send(result)
  } catch (error) {
    console.error('Error in getAllUsers: ' + error.message)
    return next(createError(500, 'Something went wrong with the server'))
  }
}

/**
 * Function to get a specific user by ID.
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Function to call next action
 * @returns {object} A Response object that contains all users
 */
async function getUserById (req, res, next) {
  try {
    // asynchronously get the data
    const userId = req.params.id
    let result = await User.findById(userId)
    if (!result) return next(createError(404, 'User not found.'))
    // don't return the user password
    delete result.dataValues.password
    return res.send(result.dataValues)
  } catch (error) {
    console.error('Error in getAllUsers: ' + error.message)
    return next(createError(500, 'Something went wrong with the server'))
  }
}

/**
 * Function to search a specific user.
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Function to call next action
 * @returns {object} A Response object that contains all users
 */
async function searchUser (req, res, next) {
  try {
    // asynchronously get the data
    const params = req.body
    const rawData = await User.findAll({ where: params })
    if (rawData.length === 0) return next(createError(404, 'User not found.'))
    const result = rawData.map(item => {
      // don't return the user password
      delete item.dataValues.password
      return item.dataValues
    })
    return res.send(result)
  } catch (error) {
    console.error('Error in getAllUsers: ' + error.message)
    return next(createError(500, 'Something went wrong with the server'))
  }
}

/**
 * Function to create user.
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Function to call next action
 * @returns {object} A Response object that contains the new user
 */
async function createUser (req, res, next) {
  try {
    let newUser = req.body
    // encrypt the password first
    const encryptedPassword = await bcrypt.hash(newUser.password, BCRYPT_STRENGTH)
    newUser.password = encryptedPassword
    // Create a new user in the database
    let result = await User.create(newUser)
    // delete protected fields
    delete result.dataValues.username
    delete result.dataValues.password
    delete result.dataValues.updatedAt
    return res.send(result.dataValues)
  } catch (error) {
    console.error('Error in getAllUsers: ' + error.message)
    return next(createError(500, error.message))
  }
}

/**
 * Function to update a certain user.
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Function to call next action
 * @returns {array} An array containing total updated fields
 */
async function updateUser (req, res, next) {
  try {
    // check if user wants to update other user
    if (parseInt(req.params.id) !== req.user.id) {
      return next(createError.Forbidden())
    }
    let updateParams = req.body
    // Update user
    let result = await User.update(updateParams, {
      where: { id: req.params.id }
    })
    return res.send(result)
  } catch (error) {
    console.error('Error in getAllUsers: ' + error.message)
    return next(createError(500, error.message))
  }
}

/**
 * Function to delete a certain user.
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next - Function to call next action
 * @returns {object} An object containing status message
 */
async function deleteUser (req, res, next) {
  try {
    // check if user wants to delete other user
    if (parseInt(req.params.id) !== req.user.id) {
      return next(createError.Forbidden())
    }
    // Delete the user
    let result = await User.destroy({
      where: { id: req.params.id }
    })
    if (!result) return next(createError(404, 'User not found'))
    // clear the cookie
    res.clearCookie(config.get('session-key'))
    req.session.destroy((err) => {
      if (err) return next(createError(500, err))
    })
    return res.json({
      'message': `deleted user with id: ${req.params.id}`
    })
  } catch (error) {
    console.error('Error in getAllUsers: ' + error.message)
    return next(createError(500, error.message))
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  searchUser,
  createUser,
  updateUser,
  deleteUser
}
