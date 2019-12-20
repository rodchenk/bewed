'use strict';

var bewed = 	require('../controllers/bewed.controller');
var projects = 	require('../controllers/projects.controller');
var pool = 		require('../controllers/pool.controller');
var user =		require('../controllers/user.controller');

const express = require('express')
const router = express.Router()

/* TODO remove this api calls */
router.get('/test', bewed.test)
router.get('/projects', projects.getAll)

/* user api */
router.get('/user', user.getByID)
router.put('/user', user.update)
router.get('/users', user.getAll)

/* pool api */
router.get 	 ('/pools/all', pool.getAll)
router.get 	 ('/pools', pool.getByUser)
router.get 	 ('/pool', pool.getByID)
router.post	 ('/pool', pool.add)
router.put 	 ('/pool', pool.update)
router.delete('/pool', pool.delete)
module.exports = router;