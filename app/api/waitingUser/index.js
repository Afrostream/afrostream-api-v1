'use strict';

var express = require('express');
var controller = require('./waitingUser.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;