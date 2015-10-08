/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment/index');
var passport = require('passport');
var session = require('express-session');
var allowCrossDomain = function (req, res, next) {

  res.header('Access-Control-Allow-Origin', config.allowOrigin.url);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');

  next();
};
module.exports = function (app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({secret: config.secrets.session}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(allowCrossDomain);
  app.use(express.static(path.join(config.root, 'server', 'static')));
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'server', 'favicon.ico')));
    app.use(morgan('combined'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(morgan('combined'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
