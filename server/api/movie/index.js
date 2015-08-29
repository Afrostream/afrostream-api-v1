'use strict';

var express = require('express');
var controller = require('./movie.controller.js');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/seasons', auth.isAuthenticated(), controller.seasons);

module.exports = router;
