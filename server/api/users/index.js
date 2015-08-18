'use strict';

var express = require('express');
var controller = require('./users.controller.js');
//var auth = require('../../auth/auth.service');

var router = express.Router();

//subscriptions
//router.post('/', auth.hasRole('admin'), controller.createUser);
//router.get('/:id', auth.hasRole('admin'), controller.getUser);

router.post('/signup', controller.createUser);

try {

	router.get('/:email', controller.getUser);
} catch (err) {
	console.log('error with the request: ' + err.message);
}

//router.post('/login', controller.loginUser);

module.exports = router;