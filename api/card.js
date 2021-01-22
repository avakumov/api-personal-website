const express = require("express")
const router = express.Router()
const { create, read, update, remove } = require("../common/crud")
const Card = require("../models/Card")
const { onlyUser, notFound } = require("../common/middleware")

router
  .use(onlyUser)
  .get("/", read(Card))
  .post("/", create(Card))
  .put("/:_id", update(Card))
  .delete("/:_id", remove(Card))
  .use(notFound)

module.exports = router
