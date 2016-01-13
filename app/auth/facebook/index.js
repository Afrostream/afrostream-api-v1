'use strict';

var express = require('express');
var controller = require('./facebook.controller.js');

var router = express.Router();

router.get('/', controller.checkAuth);

module.exports = router;