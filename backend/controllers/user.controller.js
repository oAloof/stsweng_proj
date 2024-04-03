const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserController = {}

UserController.checkAuthenticationStatus = async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ success: true, result: null })
  }

  const userId = req.user._id
  // Check if the user exists
  const response = await UserModel.getUserById(userId)
  if (!response.success) {
    return res.status(400).send(response)
  }
  const user = response.result
  if (!user) {
    return res.status(401).send({ success: true, result: null })
  }
  res.status(200).send({ success: true, result: response.result })
}

/**
 * Creates a new user.
 *
 * @param {Object} req  The request object.
 * @param {Object} res  The response object.
 * @returns {Object}    The result of the operation, a success flag, and an error
 *                      message if operation failed.
 */
UserController.registerUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body
    // Check if the user already exists
    let response = await UserModel.getUserByUsername(username)
    const existingUser = response.result
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, error: 'User already exists.', result: null })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the user
    response = await UserModel.createUser({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    if (!response.success) {
      return res.status(400).send(response)
    }

    res.status(201).send({ success: true, result: response.result })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ success: false, error: 'Failed to register user.', result: null })
  }
}

UserController.loginUser = async (req, res) => {
  try {
    // Find the user by username
    const { username, password } = req.body
    const response = await UserModel.getUserByUsername(username)
    const user = response.result
    if (!user) {
      return res.status(400).send({
        success: false,
        error: 'Invalid username or password.',
        result: null
      })
    }

    // Compare the password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        error: 'Invalid username or password.',
        result: null
      })
    }

    // Create the JWT token
    const payload = { id: user._id, username: user.username }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    // Set the JWT token in a signed cookie
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 3600000
    })

    res.status(200).send({ success: true, result: user, jwtToken: token}) // Send the token in the response because cookies are not working
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ success: false, error: 'Failed to login user.', result: null })
  }
}

module.exports = UserController
