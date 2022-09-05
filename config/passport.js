const LocalStrategy = require('passport-local').Strategy
const SteamStrategy = require('passport-steam').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new SteamStrategy({
    returnURL: 'http://localhost:2121/steamLogin',
    realm: 'http://localhost:2121/',
    apiKey: process.env.steamAPI
  },
  async function(identifier, profile, done) {
    console.log(`steam strategy`, identifier, profile)
    console.log(`users steam id is`, profile._json.steamid)
      const newUser = {
        userName: profile.displayName,
        email: "Steam",
        steamid: profile._json.steamid
      }

      try {
          let user = await User.findOne({ $and: [{ userName: profile.displayName }, { steamid: profile._json.steamid}]})


          if(user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
      } catch (err) {
        console.error(err)
      }
  }
));

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))
  

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
