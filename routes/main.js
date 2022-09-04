const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const passport = require("passport")

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.get('/steamLogin', passport.authenticate('steam'))
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

router.get('/auth/steam/return',
passport.authenticate('steam', { failureRedirect: '/' }),
function(req, res) {
  console.log("success logging in")
  res.redirect('/');
}); 

module.exports = router