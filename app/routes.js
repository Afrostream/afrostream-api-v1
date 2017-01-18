'use strict';

const express = require('express');
const router = express.Router();
const getClientBackend = require('../backend.js').getClient;

const config = require('../config');

const cache = function (req, res, next) { res.cache(); next(); };
const noCache = function (req, res, next) { res.noCache(); next(); };
const isDynamic = function (req, res, next) { res.isDynamic(); next(); };

const backendProxy = function (options) {
  return function (req, res) {
    const backend = getClientBackend(req);
    backend.proxy(req, res, { token: req.userAccessToken, timeout: options && options.timeout || null });
  };
};

// all user routes require the afro token.
const userTokenRequired = function (req, res, next) {
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
router.use('/api/logs', noCache, backendProxy());

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
router.use('/auth/twitter', noCache, backendProxy());
router.use('/auth/bouygues', noCache, backendProxy());
router.use('/auth/orange', noCache, backendProxy());
router.use('/auth/netsize', noCache, backendProxy());
router.use('/auth/wecashup', noCache, backendProxy({timeout:25000}));

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
 * introspection
 */
router.get('/headers', function (req, res) {
  res.noCache();
  res.send('<pre>' + JSON.stringify(req.headers) + '</pre>');
});

/*
 * list of features
 */
router.get('/features', function (req, res) {
  res.noCache(config);
  res.json(config.features || {});
});

/*
 * 404
 */
router.use(function (req, res) {
  res.status(404).send('Not found');
});

module.exports = router;
