'use strict';

var express = require('express');
var controller = require('./video.controller.js');

var router = express.Router();

// all videos routes are dynamic (because of the cdn selector)
router.use(function (req, res, next) {
  res.isDynamic();
  next();
});

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
