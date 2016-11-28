'use strict';

var config = require('../config');

var middlewareDumpPostdata = require('./middlewares/middleware-dumppostdata');
var middlewareAuth = require('./middlewares/middleware-auth.js');

// pre-configured express app
var AfrostreamNodeApp = require('afrostream-node-app');
var app = AfrostreamNodeApp.create();
app.use(middlewareDumpPostdata());
app.use(middlewareAuth());

var routes = require('./routes.js');
app.use(routes);

module.exports = app;
