'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.info);

module.exports = router;