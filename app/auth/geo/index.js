'use strict';

var express = require('express');
var controller = require('./geo.controller.js');

var router = express.Router();

router.get('/', controller.checkAuth);

module.exports = router;