'use strict';

var express = require('express');
var controller = require('./waitingUser.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

// all waiting users routes are no-cache
router.use(function (req, res, next) {
  res.noCache();
  next();
});

router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;