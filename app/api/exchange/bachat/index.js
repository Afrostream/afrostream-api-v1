'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./bachat.controller.js');

router.post('/customers', controller.customers);
router.post('/subscriptions', controller.subscriptions);
router.post('/refunds', controller.refunds);

module.exports = router;