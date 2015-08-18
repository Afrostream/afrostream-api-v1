// server.js

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var cors = require('cors');
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/environment');
var allowOriginUrl = config.allowOrigin.url;

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
  //require('./config/seed');
}

var allowCrossDomain = function (req, res, next) {

  res.header('Access-Control-Allow-Origin', allowOriginUrl);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');

  next();
};

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(cors());

require('./routes')(app);

var port = process.env.PORT || 3002;        // set our port

// START THE SERVER
// =============================================================================
// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});