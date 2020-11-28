const express = require('express')
const router = express.Router()
const { create, read, update, remove } = require('../common/crud')
const Tag = require('../models/Tag')
const { notOnlyMember, notFound } = require('../common/middleware')


router


.get('/', getAll(), read(Tag))
.post('/', create(Tag))
.put('/:_id', update(Tag))
.delete('/:_id', remove(Tag))

.use(notFound)

function getAll () {
	return (req, res, next) => {
		req.body = [ {}, null ]
		next()
	}
}

module.exports = router
