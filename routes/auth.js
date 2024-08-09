const express = require('express')

const authController = require('../src/controllers/auth')

const router = express.Router()

router.post('/signup', authController.handleSignUpPost)
router.post('/login', authController.handleLogInPost)
router.get('/logout', authController.handleLogOutGet)
router.post('/refresh-token', authController.handleRefreshTokenPost)

module.exports = router
