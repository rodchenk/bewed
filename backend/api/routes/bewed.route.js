'use strict';

var bewed = require('../controllers/bewed.controller');
var projects = require('../controllers/projects.controller');

const express = require('express')
const router = express.Router()

router.get('/test', bewed.test)
router.get('/user', bewed.getById)
router.post('/user', bewed.add_user)
router.get('/projects', projects.getAll)


module.exports = router;