'use strict';

var express = require('express');
var controller = require('./subscription.controller.js');
//var auth = require('../../auth/auth.service');
var router = express.Router();

//subscriptions
//router.post('/', auth.hasRole('admin'), controller.createSubscription);
router.get('/:email', controller.getSubscriptionByEmail);

router.post('', controller.createSubscription);


module.exports = router;