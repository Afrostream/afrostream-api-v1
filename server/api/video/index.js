'use strict';

var express = require('express');
var controller = require('./video.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
