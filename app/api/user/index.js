'use strict';

var express = require('express');
var controller = require('./user.controller.js');

var router = express.Router();

// all user routes are dynamic.
router.use(function (req, res, next) {
  res.noCache();
  next();
});

// all user routes require the afro token.
router.use(function (req, res, next) {
  if (!req.userAccessToken) {
    console.error('Unauthorized: missing Access-Token on '+req.url);
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
});

router.use('/:userId/favoritesMovies', require('./favoriteMovie/index'));
router.use('/:userId/favoritesEpisodes', require('./favoriteEpisode/index'));
router.use('/:userId/favoritesSeasons', require('./favoriteSeason/index'));

router.get('/me', controller.info);

router.use('/:userId/videos', require('./video/index'));

module.exports = router;