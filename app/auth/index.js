'use strict';

var express = require('express');
var controller = require('./auth.controller.js');
var validator = require('./auth.validator.js');

var router = express.Router();

var dumpPostData = require('../middlewares/middleware-dumppostdata');

router.use(function (req, res, next) {
  res.noCache();
  next();
});

router.use('/geo', require('./geo'));

// dumping signup/signin/resetPassword inputs.
router.use(dumpPostData());
router.post('/signup', validator.validateSignupBody, controller.signup);
router.post('/signin', validator.validateSigninBody, controller.signin);
router.post('/resetPassword', validator.validateResetPasswordBody, controller.signin);

module.exports = router;