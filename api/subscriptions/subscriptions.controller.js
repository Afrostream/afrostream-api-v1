'use strict';

var Subscription = require('./subscriptions.model');
var passport = require('passport');
var config = require('../../config/environment');
var MongooseClient = require('../../helpers/mongooseClient');
var EmailClient = require('../../helpers/emailClient');
var jwt = require('jsonwebtoken');

var recurlySubdomain = config.recurly.subdomain;
var recurlyApiKey = config.recurly.apiKey;

var Recurly = require('node-recurly-updated');
// We'll use uuids to generate account_code values
var uuid = require('node-uuid');

// Instantiate a configured recurly client
var recurly = new Recurly({
	SUBDOMAIN: recurlySubdomain,
	API_KEY: recurlyApiKey
});

/**
 * Get a subscription by email address
 *
 * @param {Object} req the request being made
 * @param {Object} res the result
 *
 * @return {Object} res the result being returned
 */
exports.getSubscriptionByEmail = function (req, res) {
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

/**
 * create a subscription in recurly
 *
 * @param {Object} req the request being made
 * @param {Object} res the result
 *
 * @return {Object} res the result being returned
 */
exports.createSubscription = function (req, res) {

	console.log('**** afrostream creating new subscription ***');
	var returnResponse = {};
	var firstName;
	var lastName;
	var email;

	if (req.body['is_gift'] === '1') {

		firstName = req.body['gift_first_name'];
		lastName = req.body['gift_last_name'];
		email = req.body['gift_email'];

	} else {

		firstName = req.body['first_name'];
		lastName = req.body['last_name'];
		email = req.body['email'];
	}

	// Create the subscription using minimal
	// information: plan_code, currency, account_code, and
	// the token we generated on the frontend
	recurly.subscriptions.create({
		plan_code: req.body['plan-code'],
		coupon_code: req.body['coupon_code'],
		unit_amount_in_cents: req.body['unit-amount-in-cents'],
		currency: 'EUR',
		account: {
			account_code: uuid.v1(),
			email: email,
			first_name: firstName,
			last_name: lastName,
			billing_info: {
				token_id: req.body['recurly-token']
			}
		}
	}, function (err, response) {


		// If an API error occurs, parse the error message
		if (err) {
			console.log('*** error creating a subscription - message ***');
			console.log(err);
			console.log('*** end of error creating a subscription - message ***');

			var errorFields = [];

			if ( (typeof err != "undefined") && (typeof err.data != "undefined")
				&& (typeof err.data.errors != "undefined") && (typeof err.data.errors.error != "undefined")
				&& (typeof err.data.errors.error.$ != "undefined") ) {

				var errorArray;
				var errorString;

				errorString = err.data.errors.error.$.field;
				errorArray = errorString.split('.');

				if (errorArray.length == 2) {
					errorFields.push(errorArray[1]);
					console.log('*** error - message ***');
					console.log(errorFields);
					console.log('*** end of error - message ***');

					returnResponse = {
						message: 'Transaction Declined',
						fields: errorFields
					};

					res.status(422).send(returnResponse);

				} else if (errorArray.length == 3) {
					errorFields.push(errorArray[2]);
					console.log('*** error - message ***');
					console.log(errorFields);
					console.log('*** end of error - message ***');

					returnResponse = {
						message: 'Transaction Declined',
						fields: errorFields
					};

					res.status(423).send(returnResponse);
				}
			} else {

				returnResponse = {
					message: 'Most likely a problem with recurly servers',
					fields: []
				};
				res.status(503).send(returnResponse);
			}

		} else {
			var invoiceApiUrl;
			var invoiceArray;
			var invoiceNumber;

			if ( (typeof response != 'undefined') && (typeof response.data != 'undefined')
				&& (typeof response.data.subscription != 'undefined')
				&& (typeof response.data.subscription.invoice != 'undefined')
				&& (typeof response.data.subscription.invoice.$ != 'undefined') ) {

				invoiceApiUrl = response.data.subscription.invoice.$.href;
				invoiceArray = invoiceApiUrl.split('/invoices/');
				invoiceNumber = invoiceArray[1];

				var invoiceNumber;
				var postponeDate;

				if (req.body['plan-code'] == 'afrostreammonthly') {
					postponeDate = '2015-11-01T00:00:00Z';

				} else {
					postponeDate = '2016-09-01T00:00:00Z';
				}

				recurly.subscriptions.postpone(
					response.data.subscription.uuid,
					postponeDate,
					function (err, response) {
						if (err) {
							console.log('*** error postponing the billing date - message ***');
							console.log(err);
							console.log('*** end of error postponing the billing date - message ***');
						} else if (response) {
							console.log('postponed the next billing date');
						}
					}
				);

				returnResponse = {
					status: 200,
					success: 'Updated Successfully'
				};

				var client = MongooseClient(req.body);
				client.saveGiftDetails();

				if (req.body['is_gift'] === '1') {


					var emailer = EmailClient(req.body, invoiceNumber);
					emailer.sendReceiverEmail();
					emailer.sendGiverEmail();
				} else {

					var emailer = EmailClient(req.body, invoiceNumber);
					emailer.sendStandardEmail();
				}
			}

			res.send(JSON.stringify(returnResponse));
		}
	});
};



