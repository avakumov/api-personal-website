const express = require("express")
const router = express.Router()
const { create, read, update, remove } = require("../common/crud")
const Question = require("../models/Question")
const { onlyUser, notFound } = require("../common/middleware")

router
  .use(onlyUser)
  .get("/", read(Question, ["tags"]))
  .post("/", create(Question, ["tags"]))
  .put("/:_id", update(Question, ["tags"]))
  .delete("/:_id", remove(Question))
  .use(notFound)

module.exports = router
