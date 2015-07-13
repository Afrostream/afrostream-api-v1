'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var Subscriptions = require('../api/subscriptions/subscriptions.model');

// Passport Configuration
require('./local/passport').setup(Subscriptions, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;