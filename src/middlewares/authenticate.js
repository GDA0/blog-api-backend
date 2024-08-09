const passport = require('passport')
const configurePassport = require('../utils/configure-passport')

configurePassport(passport)

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      console.error(error)
      return next(error)
    }
    if (user) {
      req.user = user
      return next()
    } else if (info && info.name === 'TokenExpiredError') {
      return res.sendStatus(401)
    } else {
      next()
    }
  })(req, res, next)
}

module.exports = authenticate
