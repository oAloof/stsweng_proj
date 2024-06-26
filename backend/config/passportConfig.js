require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('../models/user.model')

/**
 * Extracts the JWT token from the signed cookies in the request object.
 *
 * @param {Object} req - The request object.
 * @returns {string|null} - The JWT token or null if not found.
 */
const cookieExtractor = (req) => {
  let token = null
  // if (req && req.signedCookies) {
  //   token = req.signedCookies.jwtToken
  // }
  // Get the token from the Authorization header
  const bearerHeader = req.headers.authorization

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')
    token = bearer[1]
  }
  return token
}

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await UserModel.getUserById(jwtPayload.id)
        if (user.success) {
          return done(null, user.result)
        } else {
          return done(null, false)
        }
      } catch (error) {
        console.error(error)
        return done(null, false)
      }
    })
  )
}
