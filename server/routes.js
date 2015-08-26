/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors/index');
var path = require('path');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/assets', require('./api/asset'));
  app.use('/api/videos', require('./api/video'));
  app.use('/api/episodes', require('./api/episode'));
  app.use('/api/seasons', require('./api/season'));
  app.use('/api/movies', require('./api/movie'));
  app.use('/api/categorys', require('./api/category'));
  app.use('/api/subscriptions', require('./api/subscription'));
  app.use('/api/users', require('./api/user'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should have a 404 (not found) message
  app.route('/*')
    .get(function (req, res) {
      res.status(404).send('Not found');
    });
};