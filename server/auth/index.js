'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment/index');

// Passport Configuration

var router = express.Router();

router.use('/local', require('./local/index'));

module.exports = router;