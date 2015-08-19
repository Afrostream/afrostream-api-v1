'use strict';

var express = require('express');
var controller = require('./movie.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/seasons', controller.seasons);

module.exports = router;
