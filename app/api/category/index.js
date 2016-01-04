'use strict';

var express = require('express');
var controller = require('./category.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/meas', controller.mea);
router.get('/spots', controller.allSpots);
router.get('/menu', controller.menu);
router.get('/:id', controller.show);
router.get('/:id/spots', controller.spots);

module.exports = router;
