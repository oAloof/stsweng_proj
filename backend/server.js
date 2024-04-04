require('dotenv').config() // loads the environment variables from .env file

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const serverless = require('serverless-http')

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
  origin: 'https://stsweng-proj-frontend.vercel.app',
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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB:', err))

if (process.env.NODE_ENV !== 'production') {
  // Additional local development setup if necessary
  // For example, setting up a local server listener is only needed when not in production
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

// For Vercel, export the serverless handler
module.exports = app
module.exports.handler = serverless(app)
