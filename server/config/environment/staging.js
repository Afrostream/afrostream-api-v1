'use strict';

// Development specific configuration
// ==================================
module.exports = {

	// auth0 details for connecting to dev environment

	auth0: {
		domain: 'afrostream.eu.auth0.com',
		clientId: 'BtSdIqKqfIse0H1dqlpHFJgKIkUG0NpE',
		clientSecret: 'KYmL01KW5HczO-XKpltlVUONRCXtynJQ0nFqiGNOsjN9c3RsBAnr5_T-rnnc7DYY'
	},

	recurly: {
		subdomain: 'johnarch',
		apiKey: '67dbb29f0dbe4e219bc247a3b5387652'
	},
	allowOrigin: {
		url: 'http://localhost:3000'
	},
	// MongoDB connection options
	mongo: {
		uri: 'mongodb://afrostream:afr0str3am@ds047712.mongolab.com:47712/heroku_nd0hbtmt'
	},
	seedDB: true
};