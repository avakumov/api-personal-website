const express = require('express')
const router = express.Router()
const { create, read, update, remove } = require('../common/crud')
const Post = require('../models/Post')
const { notOnlyMember, notFound } = require('../common/middleware')


router


//.use(notOnlyMember)

//.get('/all/:lng/:lat/:page', nearBy(), read(Restaurant, ['owner']))

.get('/:page', getPosts(), read(Post))
.get('/', getPosts(), read(Post))
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
			, { limit: 10, skip: (page-1) * 10 }
		]
	)
}

module.exports = router
