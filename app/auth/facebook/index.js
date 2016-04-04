'use strict';

var express = require('express');
var controller = require('./facebook.controller.js');

var router = express.Router();

router.get('/signin', controller.signin);
router.get('/signup', controller.signup);
router.get('/callback', controller.callback);
router.get('/unlink', controller.unlink);

module.exports = router;