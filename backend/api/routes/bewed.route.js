'use strict';

var bewed = 	require('../controllers/bewed.controller');
var projects = 	require('../controllers/projects.controller');
var pool = 		require('../controllers/pool.controller');

const express = require('express')
const router = express.Router()

router.get('/test', bewed.test)
router.get('/user', bewed.getById)
router.post('/user', bewed.add_user)
router.get('/projects', projects.getAll)

router.post('/pool', pool.add)
router.get('/pool/all', pool.getAll)
router.get('/pool', pool.getByUser)

module.exports = router;