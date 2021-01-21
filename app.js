const express = require("express")
//const path = require("path")
const logger = require("morgan")
const passport = require("passport")
const cors = require("cors")

const { notFound, queryToBody, addOwnerToBody } = require("./common/middleware")
const api = require("./api")
const { clientURL } = require("./config")

const app = express()
app
  .use(cors({ credentials: true, origin: clientURL }))
  .use(express.json())
  .use(require("cookie-parser")())
  .use(require("body-parser").urlencoded({ extended: true }))
  .use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use(logger("dev"))
  .use(queryToBody)
  .use(addOwnerToBody)
  .use("/api", api)

  .use(notFound)

module.exports = app
