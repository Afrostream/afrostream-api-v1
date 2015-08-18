'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment/index');
var Subscriptions = require('../api/subscriptions/subscriptions.model.js');

// Passport Configuration
require('./local/passport').setup(Subscriptions, config);

var router = express.Router();

router.use('/local', require('./local/index'));

module.exports = router;