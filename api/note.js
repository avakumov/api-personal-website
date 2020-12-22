const express = require("express")
const router = express.Router()
const { create, read, update, remove } = require("../common/crud")
const Note = require("../models/Note")
const { notOnlyMember, notFound } = require("../common/middleware")

router
  .get("/", read(Note, ["tag"]))
  .post("/", create(Note, ["tag"]))
  .put("/:_id", update(Note, ["tag"]))
  .delete("/:_id", remove(Note))
  .use(notFound)


module.exports = router
