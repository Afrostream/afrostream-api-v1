/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

	// Insert routes below
	app.use('/api/subscriptions', require('./api/subscriptions'));
	//app.use('/api/accounts', require('./api/accounts'));
	app.use('/api/users', require('./api/users'));

	// All other routes should have a 404 (not found) message
	app.route('/*')
		.get(function (req, res) {
			res.status(404).send('Not found');
		});
};