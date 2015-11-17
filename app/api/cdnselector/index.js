'use strict';

var express = require('express');
var controller = require('./cdnselector.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.get('/list', auth.isAuthenticated(), controller.getList);

module.exports = router;