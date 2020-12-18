const express = require('express')
const router = express.Router()
const { create, read, update, remove } = require('../common/crud')
const TelegramChat = require('../models/TelegramChat')
const { notOnlyMember, notFound } = require('../common/middleware')


router


.get('/', getAll(), read(TelegramChat))
.post('/', create(TelegramChat))
.put('/:_id', update(TelegramChat))
.delete('/:_id', remove(TelegramChat))

.use(notFound)

function getAll () {
	return (req, res, next) => {
		req.body = [ {}, null ]
		next()
	}
}

module.exports = router
