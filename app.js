const express = require("express")
//const path = require("path")
const logger = require("morgan")
const passport = require("passport")
const cors = require("cors")

const { notFound, queryToBody } = require("./common/middleware")
const api = require("./api")
const { devClientHost, prodClientHost } = require("./config")

const app = express()
const clientHost = process.env.NODE_ENV === "production" ? prodClientHost : devClientHost
app
  .use(cors({ credentials: true, origin: clientHost }))
  .use(express.json())
  .use(require("cookie-parser")())
  .use(require("body-parser").urlencoded({ extended: true }))
  .use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use(logger("dev"))
  .use(queryToBody)
  .use("/api", api)

  .use(notFound)

module.exports = app
