'use strict';

var pool = 	require('../controllers/v2/pool.controller');

const express = require('express')
const router = express.Router()

router.get 	 ('/pools/published', pool.getPublished)
router.get 	 ('/pools/all', pool.getAll)
router.get 	 ('/pools', pool.getByUser)
router.get 	 ('/pool', pool.getByID)
router.post	 ('/pool', pool.add)
// router.put 	 ('/pool', pool.update)
// router.delete('/pool', pool.delete)
// router.get 	 ('/pool/news', pool.news)
// router.get 	 ('/pool/follows', pool.follows)
// router.get 	 ('/pool/tags', pool.tags)
// router.get 	 ('/pool/followers', pool.followers)

module.exports = router;