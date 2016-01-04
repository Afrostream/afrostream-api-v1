'use strict';

var express = require('express');
var controller = require('./episode.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/search', controller.search);

module.exports = router;
