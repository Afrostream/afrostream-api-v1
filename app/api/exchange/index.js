'use strict';

var express = require('express');
var router = express.Router();

router.use('/bachat', require('./bachat'));

module.exports = router;