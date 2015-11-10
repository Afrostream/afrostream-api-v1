'use strict';

var express = require('express');
var controller = require('./geo.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.checkAuth);

module.exports = router;