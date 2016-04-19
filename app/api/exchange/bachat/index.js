'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./bachat.controller.js');

// temporary debug
router.use(function (req, res, next) {
  console.log('HEADERS: ', req.headers);
  next();
});

router.post('/customers', controller.customers);
router.post('/subscriptions', controller.subscriptions);
router.post('/refunds', controller.refunds);

module.exports = router;