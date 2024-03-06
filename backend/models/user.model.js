const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('Users', userSchema)

exports.createUser = async (obj) => {
  const user = new User(obj)
  try {
    const result = await user.save()
    return { success: true, result }
  } catch (error) {
    throw new Error('Failed to create user.')
  }
}

exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    return { success: true, result: user }
  } catch (error) {
    throw new Error('Failed to get user.')
  }
}

exports.getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username })
    return { success: true, result: user }
  } catch (error) {
    throw new Error('Failed to get user.')
  }
}
