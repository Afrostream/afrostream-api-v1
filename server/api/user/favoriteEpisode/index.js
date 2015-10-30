'use strict';

var express = require('express');
var controller = require('./favoriteEpisode.controller.js');
var auth = require('../../../auth/service.js');

var router = express.Router({mergeParams:true});

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.add);
router.delete('/:episodeId', auth.isAuthenticated(), controller.remove);

module.exports = router;