const express = require('express')
const router = express.Router()
const { create, read, update, remove } = require('../common/crud')
const Tag = require('../models/Tag')
const { notOnlyMember, notFound } = require('../common/middleware')


router


.get('/', read(Tag))
.post('/', create(Tag))
.put('/:_id', update(Tag))
.delete('/:_id', remove(Tag))

.use(notFound)


module.exports = router
