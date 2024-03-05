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

exports.createUser = (obj) => {
  const user = new User(obj)
  try {
    const result = user.save()
    return result
  } catch (error) {
    console.error(error)
  }
}

exports.getUserById = (userId) => {
  try {
    const user = User.findById(userId)
    return user
  } catch (error) {
    throw new Error('Failed to get user.')
  }
}

exports.getUserByUsername = (username) => {
  try {
    const user = User.findOne({ username })
    return user
  } catch (error) {
    throw new Error('Failed to get user.')
  }
}

exports.getUsers = () => {}
