'use strict';

var passport = require('passport');
var config = require('../../config/environment/index');
var jwt = require('jsonwebtoken');


var Auth0 = require('auth0');
var http = require('http');
var jwt = require('express-jwt');

var CONNECTION = 'Username-Password-Authentication';


var api = new Auth0({
	domain:       config.auth0.domain,
	clientID:     config.auth0.clientId,
	clientSecret: config.auth0.clientSecret
});

/**
 * create an Auth0 user account
 *
 * @param object req the request being made
 * @param object res the response
 */
exports.createUser = function (req, res) {

	console.log('*** trying to create a user ***');
	console.log(req);
	console.log('*** end of request params ***');

	if ( (typeof req === 'undefined') || (typeof req.body === 'undefined')
		|| (typeof req.body.email === 'undefined') || (typeof req.body.password === 'undefined')
		|| (typeof req.body.subscriptionStatus === 'undefined')) {

		console.log('*** error: malformed request when getting a user ***');
		res.send(400, 'It appears that the request is malformed');
		return;
	}

	var newUser = {
		email: req.body.email,
		password: req.body.password,
		subscriptionStatus: req.body.subscriptionStatus,
		connection: CONNECTION,
		email_verified: false
	};

	api.createUser(newUser, function (err, userInfo) {

		if (err) {
			console.log('*** Error creating user: ***');
			console.log(err);
			res.send(500, err);
			return;
		}
		else {
			userInfo.status = 'ok';
			res.send(200, userInfo);
		}

	});

};

/**
 * get an Auth0 user account, by email
 *
 * @param object req the request being made
 * @param object res the response
 */
exports.getUser = function (req, res) {

	if ( (typeof req === 'undefined') || (typeof req.params === 'undefined')
		|| (typeof req.params.email === 'undefined') ) {

		console.log('*** error: malformed request when getting a user ***');
		res.send(400, 'It appears that the request is malformed');
		return;
	}
	console.log(req.params);
	console.log('*** end of the request query body ***');


	var searchCriteria = 'email: "' + req.params.email + '"';

	api.getUserBySearch(searchCriteria, function (err, userInfo) {

		if (err) {
			console.log('Error creating user: ');
			//console.log(err);
			res.send(500, err);
			return;
		}
		else {

			userInfo.status = 'ok';
			res.send(200, userInfo);
		}

	});

};




