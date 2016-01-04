'use strict';

var express = require('express');
var controller = require('./favoriteMovie.controller.js');

var router = express.Router({mergeParams:true});

router.get('/', controller.index);
router.post('/', controller.add);
router.delete('/:movieId', controller.remove);

module.exports = router;