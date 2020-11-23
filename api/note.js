const express = require('express')
const router = express.Router()
const { create, read, update, remove } = require('../common/crud')
const Note = require('../models/Note')
const { notOnlyMember, notFound } = require('../common/middleware')


router


//.use(notOnlyMember)

//.get('/all/:lng/:lat/:page', nearBy(), read(Restaurant, ['owner']))

.get('/', getAll(), read(Note))
.post('/', create(Note))
.put('/:_id', update(Note))
.delete('/:_id', remove(Note))

.use(notFound)

function getAll () {
	return (req, res, next) => {
		req.body = [ {}, null ]
		next()
	}
}

module.exports = router
