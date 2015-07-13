// server.js

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var cors = require('cors');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if (config.seedDB) {
	require('./config/seed');
}


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//app.use(express.bodyParser());
//app.use(express.urlencoded());
//app.use(express.json());

//app.use('/secured', authenticate);
//2

require('./routes')(app);

var port = process.env.PORT || 3002;        // set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);