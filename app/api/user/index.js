'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

// all user routes are dynamic.
router.use(function (req, res, next) {
  res.isDynamic();
  next();
});

router.use('/:userId/favoritesMovies', require('./favoriteMovie/index'));
router.use('/:userId/favoritesEpisodes', require('./favoriteEpisode/index'));
router.use('/:userId/favoritesSeasons', require('./favoriteSeason/index'));

router.get('/me', auth.isAuthenticated(), controller.info);

module.exports = router;