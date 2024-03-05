const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const UserController = {}

UserController.createUser = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body
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
      .send({ success: false, error: 'Failed to create user.', result: null })
  }
}

module.exports = UserController
