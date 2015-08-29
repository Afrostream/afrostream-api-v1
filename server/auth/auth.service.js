'use strict';

var config = require('../config/environment');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({
  secret: new Buffer(config.auth0.clientSecret, 'base64'),
  audience: config.auth0.clientId
});

function isAuthenticated() {
  return compose()
    //Validate jwt
    .use(function (req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      if (req.body && req.body.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.body.access_token;
      }
      validateJwt(req, res, next);
    });
}

exports.isAuthenticated = isAuthenticated;
