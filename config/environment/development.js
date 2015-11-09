'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // auth0 details for connecting to dev environment
  auth0: {
    //domain: 'johnarch.auth0.com',
    //clientId: 'hMshepR8jkfbsgjUBxZ2o06M9euIneRD',
    //clientSecret: '95Bs6ObYccAZ3Kt9aFhGiEham_8boU4XN8Ly-vJC0ISvUBZ39Ah3phP26ha7jS1n'
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
  afrostream: {
    apiSecret: '3dc3cae6-9c79-487a-9e0f-712be857dcee',
    apiKey: '8c261045-89a3-44bb-af38-65a847269605'
  },
  backend: {
    protocol: 'http',
    authority: 'localhost:9000'
  },
  purest: {
    providers: {
      afrostream: {
        '__provider': {
          oauth2: true,
          refresh: "http://localhost:9000/auth/oauth2",
          docs: "http://localhost:9000/doc"
        },
        'http://localhost:9000': {
          '__domain': {
            auth: {
              qs: {
                'access_token': "[0]"
              }
            }
          },
          'auth/oauth2/{endpoint}': {
            '__path': {
              'alias': "oauth"
            }
          },
          'api/{endpoint}': {
            '__path': {
              'alias': "api"
            }
          }
        }
      }
    }
  }
};