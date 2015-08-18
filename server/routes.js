/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors/index');
var path = require('path');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/movies', require('./server/api/movies'));
  app.use('/api/categorys', require('./server/api/categorys'));
  app.use('/api/subscriptions', require('./api/subscriptions/index'));
  //app.use('/api/accounts', require('./api/accounts'));
  app.use('/api/users', require('./api/users/index'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
  
  // All other routes should have a 404 (not found) message
  app.route('/*')
    .get(function (req, res) {
      res.status(404).send('Not found');
    });
};