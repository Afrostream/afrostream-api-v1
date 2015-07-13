'use strict';

var Subscription = require('./subscriptions.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');


/**
 * Get a single user by email address
 */
exports.getSubscriptionByEmail = function (req, res, next) {
	console.log('*** getting subscription by email address ***');
	console.log('requested email: ' + req.params.email);
	var subscriptionEmail = req.params.email;

	Subscription.findByEmail(subscriptionEmail,function (err,subscription) {
		console.log('*** searching schema by email ***');
		if (err) {
			console.log(err);
		}
		if (subscription.length === 0) {
			console.log('*** there is no recurly subscriptions for the email '
				+ req.params.email + ' ***');
			return res.json({activeStatus: false});
		}
		res.json(subscription);
	});
};




