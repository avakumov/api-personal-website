const express = require("express");
const router = express.Router();
const { create, read, update, remove } = require("../common/crud");
const Note = require("../models/Note");
const { notOnlyMember, notFound } = require("../common/middleware");

router
  .get("/", getAll(), read(Note, ["tag"]))
  .get("/bytag/:tag", byTag(), read(Note, ["tag"]))
  .post("/", create(Note, ["tag"]))
  .put("/:_id", update(Note))
  .delete("/:_id", remove(Note))

  .use(notFound);

function getAll() {
  return (req, res, next) => {
    req.body = [{}, null];
    next();
  };
}

function byTag() {
  return (req, res, next) => {
    req.body = [{ tag: req.params.tag }, null];
    next();
  };
}

module.exports = router;
