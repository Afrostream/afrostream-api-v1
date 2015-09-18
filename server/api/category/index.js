'use strict';

var express = require('express');
var controller = require('./category.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/meas', auth.isAuthenticated(), controller.mea);
router.get('/menu', auth.isAuthenticated(), controller.menu);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/spots', auth.isAuthenticated(), controller.spots);

module.exports = router;
