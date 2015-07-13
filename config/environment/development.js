'use strict';

// Development specific configuration
// ==================================
module.exports = {

	// auth0 details for connecting to dev environment

	auth0: {
		domain: 'johnarch.auth0.com',
		clientId: 'hMshepR8jkfbsgjUBxZ2o06M9euIneRD',
		clientSecret: '95Bs6ObYccAZ3Kt9aFhGiEham_8boU4XN8Ly-vJC0ISvUBZ39Ah3phP26ha7jS1n'
	},
	// MongoDB connection options
	mongo: {
		uri: 'mongodb://localhost:27017/afrostream-api-dev'
	},
	seedDB: true
};