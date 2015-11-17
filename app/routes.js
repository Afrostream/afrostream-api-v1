'use strict';

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
  app.use('/api/waitingUsers', require('./api/waitingUser'));

  app.use('/api/player', require('./api/player'));
  app.use('/api/cdnselector', require('./api/cdnselector'));

  app.use('/auth/geo', require('./auth/geo'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function pageNotFound(req, res) {
      var viewFilePath = '404';
      var statusCode = 404;
      var result = {
        status: statusCode
      };

      res.status(result.status);
      res.render(viewFilePath, function (err) {
        if (err) { return res.json(result, result.status); }

        res.render(viewFilePath);
      });
    });

  // All other routes should have a 404 (not found) message
  app.route('/*')
    .get(function (req, res) {
      res.status(404).send('Not found');
    });
};