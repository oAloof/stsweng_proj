require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('../models/user.model')

const cookieExtractor = (req) => {
  var token = null
  if (req && req.SignedCookies) {
    token = req.SignedCookies['jwtToken']
  }
  return token
}

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
}

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await UserModel.getUser(jwt_payload.id)
        if (user) {
          return done(null, user)
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
