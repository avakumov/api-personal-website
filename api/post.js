const express = require('express')
const router = express.Router()
const { create, read, update, remove } = require('../common/crud')
const Post = require('../models/Post')
const { onlySoldier, notFound } = require('../common/middleware')


router
.use(onlySoldier)
.get('/', read(Post))
.post('/', create(Post))
.put('/:_id', update(Post))
.delete('/:_id', remove(Post))

.use(notFound)


function getPosts (query={}) {
	return (req, res, next) => {
		const { page } = req.params
		if (page) {
			req.body = pageQuery(query, page)
		} else {
			req.body = allQuery(query, page)
		}
		next()
	}
}


function allQuery (query) {
	return(
		[	{...query},
			null
		]
	)
}
function pageQuery (query, page) {
	return(
		[	{...query},
			null
			, { limit: 5, skip: (page-1) * 5 }
		]
	)
}

module.exports = router
