'use strict';

var express = require('express');
var controller = require('./asset.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id/:token/*', controller.show);

module.exports = router;
