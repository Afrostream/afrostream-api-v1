'use strict';

var express = require('express');
var controller = require('./video.controller.js');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;