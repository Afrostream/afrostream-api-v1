'use strict';

var express = require('express');
var controller = require('./users.controller');
//var auth = require('../../auth/auth.service');

var router = express.Router();

//subscriptions
//router.post('/', auth.hasRole('admin'), controller.createUser);
//router.get('/:id', auth.hasRole('admin'), controller.getUser);

router.post('/signup', controller.createUser);

module.exports = router;