require('dotenv').config() // loads the environment variables from .env file

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')

// Route Imports
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')

// express app
const app = express()

// express app settings
app.use(express.json()) // to parse json content
app.use(express.urlencoded({ extended: true })) // to parse body from url
app.use(cookieParser())
// app.use(cookieParser(process.env.COOKIE_SECRET)) // to parse cookies
app.use(passport.initialize()) // to initialize passport for authentication

const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}
app.use(cors(corsOptions)) // to allow cross-origin requests

// Configure passport
require('./config/passportConfig')(passport)

app.use((req, res, next) => {
  console.log(req.path, req.method) // log the path and method of the request
  next()
})

// Routes
app.use(
  '/api/tasks',
  passport.authenticate('jwt', { session: false }),
  taskRoutes
)

app.use('/api/users', userRoutes)

// connect to the mongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database.')

    // start listening for requests
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}...`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
