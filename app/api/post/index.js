'use strict';

var express = require('express');
var controller = require('./post.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:postUUID', controller.show);

module.exports = router;
