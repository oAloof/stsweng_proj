const express = require('express')
const passport = require('passport')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get(
  '/check-auth',
  passport.authenticate('jwt', { session: false }),
  userController.checkAuthenticationStatus
)
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
