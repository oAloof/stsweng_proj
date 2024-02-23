require('dotenv').config() // loads the environment variables from .env file

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const passport = require('passport')

// Route Imports
const taskRoutes = require('./routes/taskRoutes')

// express app
const app = express()

// express app settings
app.use(express.json()) // to parse json content
app.use(express.urlencoded({ extended: true })) // to parse body from url
app.use(cookieParser(process.env.COOKIE_SECRET)) // to parse cookies
app.use(passport.initialize()) // to initialize passport for authentication

// Configure passport
require('./config/passportConfig')(passport)

app.use((req, res, next) => {
  console.log(req.path, req.method) // log the path and method of the request
  next()
})

// Routes
app.use('/api/tasks', taskRoutes)

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
