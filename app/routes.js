'use strict';

var express = require('express');
var router = express.Router();
var backend = require('./backend.js');

var cache = function (req, res, next) { res.cache(); next(); };
var noCache = function (req, res, next) { res.noCache(); next(); };
var isDynamic = function (req, res, next) { res.isDynamic(); next(); };

var backendProxy = function (req, res) {
  backend.proxy(req, res, { token: req.userAccessToken });
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

/*
 * API
 */
router.use('/api/assets', cache, backendProxy);
router.use('/api/billings', noCache, backendProxy);
router.use('/api/categorys', cache, backendProxy);
router.use('/api/cdnselector', noCache, backendProxy);
router.use('/api/episodes/search', isDynamic, backendProxy);
router.use('/api/episodes', cache, backendProxy);
router.use('/api/exchanges', noCache, backendProxy);
router.use('/api/movies/search', isDynamic, backendProxy);
router.use('/api/movies', cache, backendProxy);
router.use('/api/player', cache, backendProxy);
router.use('/api/posts', cache, backendProxy);
router.use('/api/seasons/search', isDynamic, backendProxy);
router.use('/api/seasons', cache, backendProxy);
router.use('/api/subscriptions', noCache, backendProxy);
router.use('/api/users', noCache, userTokenRequired, backendProxy);
router.use('/api/videos', noCache, backendProxy);
router.use('/api/waitingUsers', noCache, backendProxy);

/*
 * AUTH
 */
var authController = require('./auth/auth.controller.js');
var authValidator = require('./auth/auth.validator.js');

router.use('/auth/geo', noCache, backendProxy);
router.use('/auth/facebook', noCache, backendProxy);

// dumping signup/signin/resetPassword inputs.
var dumpPostData = require('./middlewares/middleware-dumppostdata');
router.post('/auth/refresh', dumpPostData(), noCache, authController.refresh);
router.post('/auth/signup', dumpPostData(), noCache, authValidator.validateSignupBody, authController.signup);
router.post('/auth/signin', dumpPostData(), noCache, authValidator.validateSigninBody, authController.signin);
router.post('/auth/reset', dumpPostData(), noCache, authValidator.validateResetPasswordBody, authController.reset);

/*
 * RIGHT
 */
router.use('/right', noCache, backendProxy);

/*
 * OTHER
 */
router.use('/alive', require('./controller.js').alive);
router.use('/headers', require('./controller.js').headers);

/*
 * 404
 */
router.use(function (req, res) {
  res.status(404).send('Not found');
});

module.exports = router;