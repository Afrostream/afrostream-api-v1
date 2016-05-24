'use strict';

var express = require('express');
var router = express.Router();

var backend = require('../backend.js');

var cache = function (req, res, next) { res.cache(); next(); };
var noCache = function (req, res, next) { res.noCache(); next(); };
var isDynamic = function (req, res, next) { res.isDynamic(); next(); };

var backendProxy = function (req, res) {
  backend.proxy(req, res, { silent: false, token: req.userAccessToken });
};

// all user routes require the afro token.
var userTokenRequired = function (req, res, next) {
  if (!req.userAccessToken) {
    console.error('Unauthorized: missing Access-Token on '+req.url);
    res.status(401).send('Unauthorized');
    return;
  }
  next();
};

router.use('/assets', cache, backendProxy);
router.use('/billings', noCache, backendProxy);
router.use('/categorys', cache, backendProxy);
router.use('/cdnselector', noCache, backendProxy);
router.use('/episodes/search', isDynamic, backendProxy);
router.use('/episodes', cache, backendProxy);

router.use('/exchanges', noCache, backendProxy);

router.use('/movies/search', isDynamic, backendProxy);
router.use('/movies', cache, backendProxy);

router.use('/player', cache, backendProxy);
router.use('/posts', cache, backendProxy);

router.use('/seasons/search', isDynamic, backendProxy);
router.use('/seasons', cache, backendProxy);

router.use('/subscriptions', noCache, backendProxy);

router.use('/users', noCache, userTokenRequired, backendProxy);

router.use('/videos', noCache, backendProxy);

router.use('/waitingUsers', noCache, backendProxy);

module.exports = router;