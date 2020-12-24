const { errorRes } = require("./response")

function notFound(req, res, _) {
  return errorRes(res, "no routes", "you are lost.", 404)
}

function onlyAdmin(req, res, next) {
  if (req.user.type === "admin") return next()
  return invalidToken(req, res)
}

function notOnlyMember(req, res, next) {
  if (req.user.type === "member") return invalidToken(req, res)
  return next()
}

function queryToBody(req, res, next) {
  if (req.method === "GET") {
    //TODO by page
    let { page, limit = 10 } = req.query
    if (page) {
      delete req.query.page
      delete req.query.limit
      req.body = [req.query, null, { limit: 5, skip: (page - 1) * limit }]
      return next()
    }
  }
  req.body = [req.query, null]
  return next()
}

function invalidToken(req, res) {
  const errMsg = "INVALID TOKEN"
  const userText = JSON.stringify(req.user)
  const err = `${errMsg} ERROR - user: ${userText}, IP: ${req.ip}`
  return errorRes(res, err, errMsg, 401)
}

module.exports = { notFound, onlyAdmin, notOnlyMember, queryToBody }
