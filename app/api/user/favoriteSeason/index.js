'use strict';

var express = require('express');
var controller = require('./favoriteSeason.controller.js');

var router = express.Router({mergeParams:true});

router.get('/', controller.index);
router.post('/', controller.add);
router.delete('/:seasonId', controller.remove);

module.exports = router;