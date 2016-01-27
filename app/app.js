'use strict';

var app = require('express')();
var express = require('express');
var path = require('path');

var config = require('../config');

var env = app.get('env');
app.set('startDate', new Date());
app.set('x-powered-by', false);
app.set('etag', false);
app.set('views', path.join(config.root, 'app', 'views'));
app.set('view engine', 'jade');
app.use(require('compression')());
app.use(require('body-parser').urlencoded({extended: false}));
app.use(require('body-parser').json());
app.use(require('cookie-parser')(config.cookie.secret));
app.use(require('method-override')());
app.use(require('./middlewares/middleware-allowcrossdomain')());
app.use(require('./middlewares/middleware-client-ip')());

app.use(express.static(path.join(config.root, 'static')));
app.use(require('serve-favicon')(path.join(config.root, 'static', 'favicon.ico')));
app.use(require('morgan')('combined'));

if ('development' === env || 'test' === env) {
  app.use(require('connect-livereload')());
  app.use(require('errorhandler')()); // Error handler - has to be last
}

// FIXME: reword this api
app.use(function cacheHandler(req, res, next) {
  res.noCache = function () {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache'); // http 1.0
    res.set('Expires', '0'); // proxy
  };
  res.isDynamic = function () {
    res.set('Cache-Control', 'public, max-age=0');
  };
  res.cache = function (duration) {
    res.set('Cache-Control', 'public, max-age=' + (duration || 60) + ', stale-while-revalidate=10');
  };
  res.isStatic = function () {
    res.set('Cache-Control', 'public, max-age=31536000');
  };
  next();
});

app.get('/headers', function (req, res) {
  res.send('<pre>' + JSON.stringify(req.headers) + '</pre>');
});

app.use(require('./middlewares/middleware-auth.js')());

require('./routes.js')(app);

module.exports = app;