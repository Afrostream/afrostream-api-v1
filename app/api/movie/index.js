'use strict';

var express = require('express');
var controller = require('./movie.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/seasons', auth.isAuthenticated(), controller.seasons);
router.post('/search', auth.isAuthenticated(), controller.search);

module.exports = router;
