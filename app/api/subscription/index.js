'use strict';

var express = require('express');
var controller = require('./subscription.controller.js');
var router = express.Router();

// all subscriptions routes are dynamic.
router.use(function (req, res, next) {
  res.noCache();
  next();
});

router.get('/cancel', controller.cancel);
router.get('/status', controller.status);
router.post('/', controller.create);
router.post('/gift', controller.gift);
router.post('/coupon', controller.coupons);

module.exports = router;