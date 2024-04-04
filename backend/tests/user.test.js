/* eslint-env jest */

const userModel = require('../models/user.model')
const userController = require('../controllers/user.controller')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* User controller functions
    - checkAuthenticationStatus
    - registerUser
    - loginUser
*/

jest.mock('../models/user.model', () => ({
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getUserByUsername: jest.fn()
}))

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn()
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}))

describe('User Controller', () => {
  const req = {
    body: {},
    flash: jest.fn()
  }

  const res = {
    redirect: jest.fn(),
    render: jest.fn(),
    send: jest.fn(),
    // status: jest.fn(),
    status: jest.fn().mockReturnValue({ send: jest.fn() }),
    json: jest.fn(),
    console: jest.fn(),
    error: jest.fn(),
    cookie: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // CHECK AUTHENTICATION STATUS
  describe('Check Authentication Status', () => {
    it('success: check authentication status', async () => {
      // Arrange
      const userDetails = {
        _id: 'asdfasdfasdf',
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      const success = { success: true, result: userDetails }

      req.user = userDetails

      userModel.getUserById.mockImplementation(userDetails => success) // Simulate success

      // Act
      await userController.checkAuthenticationStatus(req, res)

      // Assert
      expect(userModel.getUserById).toHaveBeenCalledWith(req.user._id)
      expect(res.status(200).send).toHaveBeenCalledWith(success)
    })

    it('failure: no req.user OR no user', async () => {
      // Arrange
      const userDetails = {
        _id: 'asdfasdfasdf',
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      req.user = userDetails

      const error = { success: true, result: null }

      userModel.getUserById.mockImplementation(() => error)

      // Act
      await userController.checkAuthenticationStatus(req, res)

      // Assert
      expect(userModel.getUserById).toHaveBeenCalledWith(req.user._id)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
      expect(res.status(401).send).toHaveBeenCalledWith(error)
    })

    it('failure: response success is false', async () => {
      // Arrange
      const userDetails = {
        _id: 'asdfasdfasdf',
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      req.user = userDetails

      const error = { success: false, result: null }

      userModel.getUserById.mockImplementation(() => error)

      // Act
      await userController.checkAuthenticationStatus(req, res)

      // Assert
      expect(userModel.getUserById).toHaveBeenCalledWith(req.user._id)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })
  })

  // REGISTER USER
  describe('Register User', () => {
    it('success: registered user', async () => {
      // Arrange
      const userDetails = {
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      const error = { success: false, error: 'Failed to get user.', result: null }
      const success = { success: true, result: userDetails }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userDetails.password, salt)

      userDetails.password = hashedPassword
      req.body = userDetails

      userModel.getUserByUsername.mockImplementation(username => error)
      userModel.createUser.mockImplementation(userDetails => success) // Simulate success
      // Act
      await userController.registerUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(userModel.createUser).toHaveBeenCalledWith(userDetails)
      expect(res.status(201).send).toHaveBeenCalledWith(success)
    })

    it('failure: existing user', async () => {
      // Arrange
      const userDetails = {
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      const errorFoundUser = { success: true, result: userDetails }
      const error = { success: false, error: 'User already exists.', result: null }

      req.body = userDetails

      userModel.getUserByUsername.mockImplementation(username => errorFoundUser) // Simulate success

      // Act
      await userController.registerUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })

    it('failure: response.success for createUser is false', async () => {
      // Arrange
      const userDetails = {
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      const error = { success: false, result: userDetails }
      const errorUserDNE = { success: false, error: 'Failed to get user.', result: null }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userDetails.password, salt)

      userDetails.password = hashedPassword
      req.body = userDetails

      userModel.getUserByUsername.mockImplementation(username => errorUserDNE)
      userModel.createUser.mockImplementation(userDetails => error) // Simulate error

      // Act
      await userController.registerUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(userModel.createUser).toHaveBeenCalledWith(userDetails)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })

    it('failure: caught error during getUserByUsername', async () => {
      // Arrange
      const userDetails = {
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      const registerError = { success: false, error: 'Failed to register user.', result: null }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userDetails.password, salt)

      userDetails.password = hashedPassword
      req.body = userDetails

      userModel.getUserByUsername.mockImplementation(username => null)
      userModel.createUser.mockImplementation() // Simulate error

      // Act
      await userController.registerUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      // expect(userModel.createUser).toHaveBeenCalledWith(userDetails)
      expect(res.status(500).send).toHaveBeenCalledWith(registerError)
    })

    it('failure: caught error during createUser', async () => {
      // Arrange
      const userDetails = {
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      const errorUserDNE = { success: false, error: 'Failed to get user.', result: null }
      const registerError = { success: false, error: 'Failed to register user.', result: null }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userDetails.password, salt)

      userDetails.password = hashedPassword
      req.body = userDetails

      userModel.getUserByUsername.mockImplementation(username => errorUserDNE)
      userModel.createUser.mockImplementation(userDetails => null) // Simulate error

      // Act
      await userController.registerUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(userModel.createUser).toHaveBeenCalledWith(userDetails)
      expect(res.status(500).send).toHaveBeenCalledWith(registerError)
    })
  })

  // LOGIN USER
  describe('Login User', () => {
    it('success: logged in', async () => {
      // Arrange
      const basicUserDetails = {
        username: 'Sukuna',
        password: 'test123'
      }

      const userDetails = {
        _id: 'sadfas3123',
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      password = 'test123'
      req.body = basicUserDetails

      // Create the JWT token
      const payload = { id: userDetails._id, username: userDetails.username }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })

      const tokenCookieDetails = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 3600000
      }

      const foundUser = { success: true, result: userDetails }
      const success = { success: true, result: userDetails, jwtToken: token }

      userModel.getUserByUsername.mockImplementation(username => foundUser)
      bcrypt.compare.mockImplementation((password, userPassword) => true)

      // Act
      await userController.loginUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(bcrypt.compare).toHaveBeenCalledWith(basicUserDetails.password, password)
      expect(res.cookie).toHaveBeenCalledWith('jwtToken', token, tokenCookieDetails)
      expect(res.status(200).send).toHaveBeenCalledWith(success)
    })

    it('failure: invalid user', async () => {
      // Arrange
      const userDetails = {
        username: 'Sukuna',
        password: 'test123'
      }

      req.body = userDetails

      const errorUserDNE = { success: false, error: 'Failed to get user.', result: null }
      const error = { success: false, error: 'Invalid username or password.', result: null }

      userModel.getUserByUsername.mockImplementation(() => errorUserDNE)

      // Act
      await userController.loginUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })

    it('failure: invalid password', async () => {
      // Arrange
      const basicUserDetails = {
        username: 'Sukuna',
        password: 'test123'
      }

      const userDetails = {
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      req.body = basicUserDetails

      const foundUser = { success: true, result: userDetails }
      const error = { success: false, error: 'Invalid username or password.', result: null }

      userModel.getUserByUsername.mockImplementation(username => foundUser)
      bcrypt.compare.mockImplementation((password, userPassword) => false)

      // Act
      await userController.loginUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(bcrypt.compare).toHaveBeenCalledWith(basicUserDetails.password, userDetails.password)
      expect(res.status(400).send).toHaveBeenCalledWith(error)
    })

    it('failure: caught error in getByUsername', async () => {
      // Arrange
      const userDetails = {
        username: 'Sukuna',
        firstName: 'Tadashi',
        lastName: 'Takoyaki',
        email: 'hi@gmail.com',
        password: 'test123'
      }

      const error = { success: false, error: 'Failed to login user.', result: null }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userDetails.password, salt)

      userDetails.password = hashedPassword
      req.body = userDetails

      userModel.getUserByUsername.mockImplementation(username => null) // Simulate error
      userModel.createUser.mockImplementation() // Simulate error

      // Act
      await userController.loginUser(req, res)

      // Assert
      expect(userModel.getUserByUsername).toHaveBeenCalledWith(userDetails.username)
      expect(res.status(500).send).toHaveBeenCalledWith(error)
    })
  })
})
