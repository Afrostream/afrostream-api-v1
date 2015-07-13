'use strict';

var passport = require('passport');
var config = require('../../config/environment');
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

console.log('*** api object ***');
console.log(api);
console.log('*** end of api object ***');

/**
 * create an user account, without payment details
 */
exports.createUser = function (req, res, next) {
	console.log('*** creating an auth0 user account ***');

	var newUser = {
		email:          'john06@doe.com',
		password:       'somepass',
		connection:     CONNECTION,
		email_verified: false
	};

	api.createUser(newUser, function (err, userInfo) {

		console.log('** trying to create user ***');
		if (err) {
			console.log('Error creating user: ');
			console.log(err);
			res.send(500, err);
			return;
		}
		else {
			console.log('*** message from server when trying to create user ***');
			console.log(userInfo);
			userInfo.status = 'ok';
			res.send(200, userInfo);
		}

	});

};




