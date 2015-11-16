'use strict';

var express = require('express');
var controller = require('./waitingUser.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

// all waiting users routes are dynamic.
router.use(function (req, res, next) {
  res.isDynamic();
  next();
});

router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;