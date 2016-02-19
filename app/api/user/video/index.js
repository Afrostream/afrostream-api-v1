'use strict';

var express = require('express');
var controller = require('./video.controller.js');

var router = express.Router({mergeParams:true});

router.get('/:videoId', controller.show);
router.put('/:videoId', controller.update);
router.get('/', controller.index);

module.exports = router;