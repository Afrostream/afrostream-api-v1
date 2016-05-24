'use strict';

var express = require('express');
var controller = require('./auth.controller.js');
var validator = require('./auth.validator.js');

var router = express.Router();

var dumpPostData = require('../middlewares/middleware-dumppostdata');

var backend = require('../backend.js');

var backendProxy = function (req, res) {
  backend.proxy(req, res, { token: req.userAccessToken });
};

router.use(function (req, res, next) {
  res.noCache();
  next();
});



module.exports = router;