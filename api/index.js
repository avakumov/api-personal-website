const express = require("express")
const router = express.Router()
const auth = require("./auth")
const user = require("./user")
const note = require("./note")
const post = require("./post")
const tag = require("./tag")
const telegram_chat = require("./telegramChat")
// const { errorRes, successRes } = require("../common/response")
const { notFound } = require("../common/middleware")
const mongoose = require("mongoose")
const { devMongoUrl, prodMongoUrl } = require("../config")
// const expressJwt = require("express-jwt")
// const { jwtSecretSalt } = require("../config")

const mongoUrl = process.env.NODE_ENV === "production" ? prodMongoUrl : devMongoUrl

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  //autoIndex: false,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

router
  .get("/ping", (req, res) => res.json("pong"))
  .use("/auth", auth)
  .use("/note", note)
  .use("/tag", tag)
  .use("/post", post)
  .use("/user", user)
  .use("/telegram/chat", telegram_chat)

  // .use(expressJwt({ secret: jwtSecretSalt, algorithms: ['HS256'] }),
  // 	(err, req, res, next) => {
  // 		if (err.name === 'UnauthorizedError') {
  // 			console.error(req.user, req.ip, 'invalid token');
  // 			return errorRes(res, err, 'Login to proceed', 401)
  // 		}
  // 	}
  // )

  .use(notFound)

module.exports = router
