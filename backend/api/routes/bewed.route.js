'use strict';

var pool = 		require('../controllers/pool.controller');
var user =		require('../controllers/user.controller');

const express = require('express')
const router = express.Router()

/* user api */
router.get 	 ('/user', user.getByID)
router.put 	 ('/user', user.update)
router.get 	 ('/user/image', user.getImage)
router.get 	 ('/users', user.getAll)

/* pool api */
router.get 	 ('/pools/all', pool.getAll)
router.get 	 ('/pools', pool.getByUser)
router.get 	 ('/pool', pool.getByID)
router.post	 ('/pool', pool.add)
router.put 	 ('/pool', pool.update)
router.delete('/pool', pool.delete)

/* task api (part of pool table) */
router.post	 ('/task', pool.addTask)

module.exports = router;