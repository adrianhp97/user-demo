const express = require('express')
const Router = express.Router()
const authController = require('./sessionController')

Router.post('/login', authController.loginController)
Router.get('/logout', authController.logoutController)

module.exports = Router
