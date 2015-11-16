'use strict';

var express = require('express');
var controller = require('./video.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

// all videos routes are dynamic (because of the cdn selector)
router.use(function (req, res, next) {
  res.isDynamic();
  next();
});

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;
