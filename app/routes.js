'use strict';

var express = require('express');
var router = express.Router();
var backend = require('./backend.js');

var cache = function (req, res, next) { res.cache(); next(); };
var noCache = function (req, res, next) { res.noCache(); next(); };
var isDynamic = function (req, res, next) { res.isDynamic(); next(); };

var backendProxy = function (options) {
  return function (req, res) {
    backend.proxy(req, res, { token: req.userAccessToken, timeout: options && options.timeout || null });
  };
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
 * API no cache
 */
router.use('/api/billings', noCache, backendProxy({timeout:25000}));
router.use('/api/cdnselector', noCache, backendProxy());
router.use('/api/exchanges', noCache, backendProxy({timeout:25000}));
router.use('/api/subscriptions', noCache, backendProxy({timeout:25000}));
router.use('/api/users', noCache, userTokenRequired, backendProxy());
router.use('/api/videos', noCache, backendProxy());
router.use('/api/waitingUsers', noCache, backendProxy());

/*
 * API dynamic
 */
router.use('/api/episodes/search', isDynamic, backendProxy());
router.use('/api/movies/search', isDynamic, backendProxy());

/*
 * API cache (default)
 */
router.use('/api', cache, backendProxy());

/*
 * AUTH
 */
var authController = require('./auth/auth.controller.js');
var authValidator = require('./auth/auth.validator.js');

router.use('/auth/geo', noCache, backendProxy());
router.use('/auth/facebook', noCache, backendProxy());

// dumping signup/signin/resetPassword inputs.
var dumpPostData = require('./middlewares/middleware-dumppostdata');
router.post('/auth/refresh', dumpPostData(), noCache, authController.refresh);
router.post('/auth/signup', dumpPostData(), noCache, authValidator.validateSignupBody, authController.signup);
router.post('/auth/signin', dumpPostData(), noCache, authValidator.validateSigninBody, authController.signin);
router.post('/auth/reset', dumpPostData(), noCache, authValidator.validateResetPasswordBody, authController.reset);

/*
 * RIGHT
 */
router.use('/right', noCache, backendProxy());

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