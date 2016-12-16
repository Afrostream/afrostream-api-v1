'use strict';

var config = require('../config');

var middlewareAllowPreflight = require('afrostream-node-middleware-allowpreflight');
var middlewareAllowCrossdomain = require('afrostream-node-middleware-allowcrossdomain');

var middlewareDumpPostdata = require('./middlewares/middleware-dumppostdata');
var middlewareAuth = require('./middlewares/middleware-auth.js');


// pre-configured express app
var AfrostreamNodeApp = require('afrostream-node-app');
var app = AfrostreamNodeApp.create({disableCORS:true});

// CORS
app.use(middlewareAllowPreflight());
app.use(middlewareAllowCrossdomain({url: config.cors['Access-Control-Allow-Origin']}))

app.use(middlewareDumpPostdata());
app.use(middlewareAuth());


var routes = require('./routes.js');
app.use(routes);

module.exports = app;
