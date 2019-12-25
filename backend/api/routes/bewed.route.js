'use strict';

var pool = 		require('../controllers/pool.controller');
var user =		require('../controllers/user.controller');
var task = 		require('../controllers/task.controller');

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

/* task api */
router.post	 ('/task', task.add)
router.get 	 ('/tasks', task.getByPool)
router.get 	 ('/task', task.get)

module.exports = router;