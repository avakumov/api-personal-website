const { errorRes } = require("./response")

function notFound(req, res, _) {
  return errorRes(res, "no routes", "you are lost.", 404)
}

function onlyAdmin(req, res, next) {
  if (!req.user) {
    return errorRes(res, "Not authorized", "failed operation", 401)
  }
  if (req.user.type !== "admin") {
    return errorRes(res, "Only for admins", "failed operation", 403)
  }
  return next()
}

function onlyUser(req, res, next) {
  console.log("USER: ", req.user)
  if (!req.user) {
    return errorRes(res, "Not authorized", "failed operation", 401)
  }
  if (req.user.type === "soldier" || req.user.type === "admin") {
    return next()
  }
  return errorRes(res, "Only for users and admins", "failed operation", 403)
}

function queryToBody(req, res, next) {
  if (req.method === "GET") {
    let { page, limit = 10 } = req.query
    if (page) {
      delete req.query.page
      delete req.query.limit
      req.body = [req.query, null, { limit: Number(limit), skip: (Number(page) - 1) * Number(limit) }]
      return next()
    }
    req.body = [req.query, null]
  }
  return next()
}

function addOwnerToBody(req, res, next) {
  if (req.user) {
    req.body.owner = req.user._id
    return next()
  }
  return next()
}

module.exports = { notFound, onlyAdmin, onlyUser, queryToBody, addOwnerToBody }
