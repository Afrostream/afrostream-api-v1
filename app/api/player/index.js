'use strict';

var express = require('express');
var controller = require('./player.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.get('/config', auth.isAuthenticated(), controller.showConfig);

module.exports = router;