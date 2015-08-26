'use strict';

var express = require('express');
var controller = require('./asset.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/:token/*', controller.showToken);

module.exports = router;
