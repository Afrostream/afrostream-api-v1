'use strict';

var express = require('express');
var controller = require('./subscription.controller.js');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/billing', auth.isAuthenticated(), controller.billing);
router.get('/cancel', auth.isAuthenticated(), controller.cancel);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/all', auth.isAuthenticated(), controller.all);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;