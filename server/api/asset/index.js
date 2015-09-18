'use strict';

var express = require('express');
var controller = require('./asset.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id/:token/*', auth.isAuthenticated(), controller.show);

module.exports = router;
