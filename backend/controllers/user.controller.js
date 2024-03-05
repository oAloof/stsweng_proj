const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const UserController = {}

UserController.createUser = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body
    // Check if the user already exists
    const existingUser = await UserModel.getUserByUsername(username)
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, error: 'User already exists.', result: null })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the user
    const user = await UserModel.createUser({
      username,
      firstName,
      lastName,
      password: hashedPassword
    })

    res.status(201).send({ success: true, result: user })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ success: false, error: 'Failed to create user.', result: null })
  }
}
