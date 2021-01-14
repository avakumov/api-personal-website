const { errorRes } = require("./response")

function notFound(req, res, _) {
  return errorRes(res, "no routes", "you are lost.", 404)
}

function onlyAdmin(req, res, next) {
  if (!req.user) {
    return accessError(req, res, "Not authorized")
  }
  if (req.user.type !== "admin") {
    return accessError(req, res, "Only for admins")
  }
  return next()
}

function onlySoldier(req, res, next) {
  if (!req.user) {
    return accessError(req, res, "Not authorized")
  }
  // if (req.user.type !== "soldier" || req.user.type !== "admin") {
  //   return accessError(req, res, "Only for users and admins")
  // }
  return next()
}

function queryToBody(req, res, next) {
  console.log("USER: ", req.user)
  console.log("REQ: ", req)
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

function accessError(req, res, message) {
  const errMsg = `ACCESS ERROR. ${message}`
  const userText = JSON.stringify(req.user)
  const err = `${errMsg} ERROR - user: ${userText}, IP: ${req.ip}`
  return errorRes(res, err, errMsg, 401)
}

module.exports = { notFound, onlyAdmin, onlySoldier, queryToBody }
