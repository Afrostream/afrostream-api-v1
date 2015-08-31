'use strict';

var express = require('express');
var controller = require('./subscription.controller.js');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/billing', auth.isAuthenticated(), controller.billing);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;