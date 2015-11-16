'use strict';

var app =  require('express')();
var express = require('express');
var path = require('path');

var config = require('../config/environment');

var env = app.get('env');
app.set('x-powered-by', false);
app.set('etag', false);
app.set('views', path.join(config.root, 'app', 'views'));
app.set('view engine', 'jade');
app.use(require('compression')());
app.use(require('body-parser').urlencoded({extended: false}));
app.use(require('body-parser').json());
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: config.secrets.session}));
app.use(require('passport').initialize());
app.use(require('passport').session());
app.use(require('./middlewares/middleware-allowcrossdomain')());
app.use(require('./middlewares/middleware-clientip')());

app.use(express.static(path.join(config.root, 'static')));
app.use(require('serve-favicon')(path.join(config.root, 'static', 'favicon.ico')));
app.use(require('morgan')('combined'));

if ('development' === env || 'test' === env) {
  app.use(require('connect-livereload')());
  app.use(require('errorhandler')()); // Error handler - has to be last
}

app.use(function cacheHandler(req, res, next) {
  res.isDynamic = function () {
    res.set('Cache-Control', 'public, max-age=0');
  };
  res.cache = function (duration) {
    res.set('Cache-Control', 'public, max-age=' + (duration || 60));
  };
  res.isStatic = function () {
    res.set('Cache-Control', 'public, max-age=31536000');
  };
  // all routes are dynamic by default
  res.isDynamic();
  next();
});

app.get('/headers', function (req, res) {
  res.send('<pre>'+JSON.stringify(req.headers)+'</pre>');
});

require('./routes.js')(app);

module.exports = app;