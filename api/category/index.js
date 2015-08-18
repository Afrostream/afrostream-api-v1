'use strict';

var express = require('express');
var controller = require('./category.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/top', controller.menu);
router.get('/mea', controller.mea);
router.get('/menu', controller.menu);
router.get('/:id', controller.show);

module.exports = router;
