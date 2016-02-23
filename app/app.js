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
app.use(require('./middlewares/middleware-dumppostdata')());
app.use(require('./middlewares/middleware-allowcrossdomain')({
  origin:config.allowOrigin.url,
  headers:'Access-Token'
}));
app.use(require('./middlewares/middleware-client-ip')());

app.use(express.static(path.join(config.root, 'static')));
app.use(require('serve-favicon')(path.join(config.root, 'static', 'favicon.ico')));
app.use(require('morgan')('combined'));

app.use(require('./middlewares/middleware-cachehandler')());

if ('development' === env || 'test' === env) {
  app.use(require('connect-livereload')());
  app.use(require('errorhandler')()); // Error handler - has to be last
}

app.get('/headers', function (req, res) {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.set('Pragma', 'no-cache'); // http 1.0
  res.set('Expires', '0'); // proxy
  res.send('<pre>' + JSON.stringify(req.headers) + '</pre>');
});

var backend = require('./backend');
app.post('/test/post', function (req, res) {
  backend.postData(req, '/test/post').nodeify(backend.fwd(res));
});

app.use(require('./middlewares/middleware-auth.js')());

require('./routes.js')(app);

module.exports = app;