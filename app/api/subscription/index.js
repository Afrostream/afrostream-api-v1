'use strict';

var express = require('express');
var controller = require('./subscription.controller.js');
var auth = require('../../auth/service.js');
var router = express.Router();

// all subscriptions routes are dynamic.
router.use(function (req, res, next) {
  res.isDynamic();
  next();
});

router.get('/billing', auth.isAuthenticated(), controller.billing);
router.get('/cancel', auth.isAuthenticated(), controller.cancel);
router.get('/status', auth.isAuthenticated(), controller.status);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/all', auth.isAuthenticated(), controller.all);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/gift', auth.isAuthenticated(), controller.gift);

module.exports = router;