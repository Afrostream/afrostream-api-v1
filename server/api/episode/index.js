'use strict';

var express = require('express');
var controller = require('./episode.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/search', auth.isAuthenticated(), controller.search);

module.exports = router;
