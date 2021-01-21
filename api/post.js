const express = require("express")
const router = express.Router()
const { create, read, update, remove } = require("../common/crud")
const Post = require("../models/Post")
const { onlyUser, notFound } = require("../common/middleware")

router
  .use(onlyUser)
  .get("/", read(Post))
  .post("/", create(Post))
  .put("/:_id", update(Post))
  .delete("/:_id", remove(Post))

  .use(notFound)

module.exports = router
