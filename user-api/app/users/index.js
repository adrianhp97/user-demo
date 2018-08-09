const express = require('express')
const router = express.Router()
const controller = require('./userController')
const authMiddleware = require('../middlewares/auth')

/** Create user */
router.post('/', controller.createUser)

/** Get all users */
router.get('/', authMiddleware.checkUserSession, controller.getAllUsers)

/** Get user by id */
router.get('/:id', authMiddleware.checkUserSession, controller.getUserById)

/** Search user by params */
router.post('/search', authMiddleware.checkUserSession, controller.searchUser)

/** Update user */
router.patch('/:id', authMiddleware.checkUserSession, controller.updateUser)

/** Delete user */
router.delete('/:id', authMiddleware.checkUserSession, controller.deleteUser)

module.exports = router
