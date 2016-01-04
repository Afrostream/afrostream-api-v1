'use strict';

var express = require('express');
var controller = require('./favoriteEpisode.controller.js');

var router = express.Router({mergeParams:true});

router.get('/', controller.index);
router.post('/', controller.add);
router.delete('/:episodeId', controller.remove);

module.exports = router;