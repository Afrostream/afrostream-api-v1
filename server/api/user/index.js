'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var auth = require('../../auth/service.js');

var router = express.Router();

router.use('/:userId/favoritesMovies', require('./favoriteMovie'));
router.use('/:userId/favoritesEpisodes', require('./favoriteEpisode'));
router.use('/:userId/favoritesSeasons', require('./favoriteSeason'));

router.get('/me', auth.isAuthenticated(), controller.info);

module.exports = router;