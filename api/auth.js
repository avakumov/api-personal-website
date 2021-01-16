const express = require("express")
const passport = require("passport")
const router = express.Router()

const GoogleStrategy = require("passport-google-oauth20").Strategy
const { googleClientID, googleClientSecret, devGoogleAuthCallback } = require("../config")
const User = require("../models/User")

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: devGoogleAuthCallback,
    },
    async function myVerifyCallbackFn(accessToken, refreshToken, profile, cb) {
      try {
        const user = await User.findOne({ provider: "google", provider_user_id: profile.id })
        if (!user) {
          const newUser = await User.create({
            name: profile.name.familyName + " " + profile.name.givenName,
            email: profile._json.email,
            provider: "google",
            provider_user_id: profile.id,
            type: "soldier",
          })
          return cb(null, newUser)
        }
        cb(null, user)
      } catch (err) {
        return cb(err, null)
      }
    }
  )
)

// User session support for our hypothetical `user` objects.
passport.serializeUser(function (user, cb) {
  cb(null, user._id)
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id)
  cb(null, user)
})

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
  res.redirect("back")
})

router.get("/logout", function (req, res) {
  req.logout()
  res.redirect("back")
})

module.exports = router
