'use strict';

const config = require('../config');

const middlewareDumpPostdata = require('./middlewares/middleware-dumppostdata');
const middlewareAuth = require('./middlewares/middleware-auth.js');
const middlewareFeature = require('afrostream-node-feature').middleware;

// pre-configured express app
const AfrostreamNodeApp = require('afrostream-node-app');
const app = AfrostreamNodeApp.create();
app.use(middlewareDumpPostdata());
app.use(middlewareAuth());
app.use(middlewareFeature({features:config.features}));

const routes = require('./routes.js');
app.use(routes);

module.exports = app;
