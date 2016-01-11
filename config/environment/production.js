'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.PORT ||
  8080,

  cookie: {
    name: 'auth',
    domain: '.afrostream.dev', // RFC 2109
    secret: '-=4fr0str34m=-'
  },

  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_SECRET
  },
  recurly: {
    subdomain: process.env.RECURLY_SUB_DOMAIN,
    apiKey: process.env.RECURLY_API_KEY
  },
  afrostream: {
    apiSecret: process.env.AFROSTREAM_API_SECRET,
    apiKey: process.env.AFROSTREAM_API_KEY
  },
  allowOrigin: {
    url: process.env.ALLOW_URL
  },
  backend: {
    protocol: 'https',
    authority: 'afrostream-backend.herokuapp.com'
  },
  purest: {
    providers: {
      afrostream: {
        '__provider': {
          oauth2: true,
          refresh: "https://afrostream-backend.herokuapp.com/auth/oauth2",
          docs: "https://afrostream-backend.herokuapp.com/doc"
        },
        'https://afrostream-backend.herokuapp.com': {
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
