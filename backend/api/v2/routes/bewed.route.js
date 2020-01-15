'use strict';

var pool = 	require('../controllers/pool.controller');
var user =  require('../controllers/user.controller');

const express = require('express')
const router = express.Router()

/* user api */
router.get 	 ('/user', user.getByID)
router.put 	 ('/user', user.update)
router.get 	 ('/user/image', user.getImage)
router.get 	 ('/users', user.getAll)
router.get 	 ('/user/values', user.getValues)

/* pool api */
router.get 	 ('/pools/published', pool.getPublished)
router.get 	 ('/pools/all', pool.getAll)
router.get 	 ('/pools', pool.getByUser)
router.get 	 ('/pool', pool.getByID)
router.post	 ('/pool', pool.add)
router.put 	 ('/pool', pool.update)
// router.delete('/pool', pool.delete)
// router.get 	 ('/pool/news', pool.news)
// router.get 	 ('/pool/follows', pool.follows)
// router.get 	 ('/pool/tags', pool.tags)
// router.get 	 ('/pool/followers', pool.followers)

module.exports = router;