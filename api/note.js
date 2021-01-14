const express = require("express")
const router = express.Router()
const { create, read, update, remove } = require("../common/crud")
const Note = require("../models/Note")
const { onlySoldier, notFound } = require("../common/middleware")

router
  .use(onlySoldier)
  .get("/", read(Note, ["tag"]))
  .post("/", create(Note, ["tag"]))
  .put("/:_id", update(Note, ["tag"]))
  .delete("/:_id", remove(Note))
  .use(notFound)

module.exports = router
