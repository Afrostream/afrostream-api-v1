'use strict';

var app = require('express')();
var express = require('express');
var path = require('path');

var config = require('../config');

var env = app.get('env');
app.set('startDate', new Date());
app.set('x-powered-by', false);
app.set('etag', false);
app.use(require('compression')());
app.use(require('body-parser').text({type: 'text/xml'}));
app.use(require('body-parser').urlencoded({extended: false}));
app.use(require('body-parser').json());
app.use(require('method-override')());
app.use(require('./middlewares/middleware-dumppostdata')());
app.use(require('./middlewares/middleware-allowcrossdomain')({
  origin:config.allowOrigin.url,
  headers:'Access-Token'
}));
app.use(require('./middlewares/middleware-client-ip')());

app.use(require('morgan')('combined'));

app.use(require('./middlewares/middleware-cachehandler')());

if ('development' === env || 'test' === env) {
  app.use(require('connect-livereload')());
  app.use(require('errorhandler')()); // Error handler - has to be last
}

app.use(require('./middlewares/middleware-auth.js')());

app.use(require('./routes.js'));

module.exports = app;