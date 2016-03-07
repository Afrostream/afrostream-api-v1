'use strict';

var express = require('express');
var controller = require('./billing.controller.js');
var router = express.Router();

// all subscriptions routes are dynamic.
router.use(function (req, res, next) {
  res.noCache();
  next();
});

router.get('/internalplans', controller.showInternalplans);
router.post('/subscriptions', controller.createSubscriptions);
router.post('/gifts', controller.createGift);
router.put('/subscriptions/:subscriptionUuid/cancel', controller.cancelSubscriptions);

module.exports = router;