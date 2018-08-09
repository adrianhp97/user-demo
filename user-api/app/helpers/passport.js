const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const User = require('../users/userModel')

passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({
      attributes: ['email', 'password'],
      where: {
        email: email
      }
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'Email not found.' })
      } else {
        return bcrypt.compare(password, user.dataValues.password).then(res => {
          if (!res) {
            return done(null, false, { message: 'Incorrect password.' })
          } else {
            let authenticatedUser = user.dataValues
            delete authenticatedUser.password
            return done(null, authenticatedUser)
          }
        })
      }
    }).catch(err => {
      return done(err, false)
    })
  }
)
)

passport.serializeUser((user, done) => {
  done(null, user.email)
})

// Called when user has logged in
// Function will bind the request with user data, just call req.user
passport.deserializeUser((email, done) => {
  User.find({
    attributes: ['id', 'email', 'name', 'phone'],
    where: {
      email: email
    }
  }).then(user => {
    let authUser = user.dataValues
    done(null, authUser)
  })
})

module.exports = passport
