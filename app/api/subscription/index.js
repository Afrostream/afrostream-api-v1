'use strict';

var express = require('express');
var controller = require('./subscription.controller.js');
var router = express.Router();

// all subscriptions routes are dynamic.
router.use(function (req, res, next) {
  res.noCache();
  next();
});

router.get('/billing', controller.billing);
router.get('/cancel', controller.cancel);
router.get('/status', controller.status);
router.get('/me', controller.me);
router.get('/all', controller.all);
router.post('/', controller.create);
router.post('/gift', controller.gift);

module.exports = router;