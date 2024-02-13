require('dotenv').config() // loads the environment variables from .env file

const express = require('express')
const mongoose = require('mongoose')

// express app
const app = express()

// express app settings
app.use(express.json()) // to parse json content
app.use(express.urlencoded({ extended: true })) // to parse body from url

app.use((req, res, next) => {
  console.log(req.path, req.method) // log the path and method of the request
  next()
})

/**
 *
 * API routes go here
 *
 */

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
