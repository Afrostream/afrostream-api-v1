'use strict';

var express = require('express');
var controller = require('./video.controller.js');

var router = express.Router({mergeParams:true});

router.get('/:videoId', controller.show);
router.put('/:videoId', controller.update);

module.exports = router;