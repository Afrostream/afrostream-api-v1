'use strict';

var express = require('express');
var controller = require('./favoriteSeason.controller.js');
var auth = require('../../../auth/service.js');

var router = express.Router({mergeParams:true});

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.add);
router.delete('/:seasonId', auth.isAuthenticated(), controller.remove);

module.exports = router;