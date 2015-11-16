'use strict';

var config = require('../config/environment');

var request = require('request');

var Q = require('q');

// single backend, unique token.
var token;

var isTokenValid = function () {
  return token && new Date(token.expires_at).getTime() > Date.now();
};

var getToken = function (done) {
  if (isTokenValid()) {
    return Q(token);
  }
  return Q.nfcall(request, {
    method: 'POST',
    uri: config.backend.protocol + '://' + config.backend.authority + '/auth/oauth2/token',
    json: true,
    form: {
      grant_type: 'client_credentials',
      client_id: config.afrostream.apiKey,
      client_secret: config.afrostream.apiSecret
    }
  }).then(function (result) {
    if (result[0].statusCode !== 200) {
      throw result[1];
    }
    token = result[1];
    console.log(token, token.expires_in);
    token.expires_at = new Date(Date.now() + 1000 * token.expires_in).toISOString();
    return token;
  });
};

/**
 * call the backend, return the result
 */
var getData = function (req, path) {
  return getToken()
    .then(function (token) {
      return Q.nfcall(request, {
        method: 'GET',
        json: true,
        uri: config.backend.protocol + '://' + config.backend.authority + path,
        headers: {
          'x-forwarded-clientip': req.herokuclientip
        },
        oauth: {
          consumer_key: config.afrostream.apiKey,
          consumer_secret: config.afrostream.apiSecret,
          token: token.access_token
        }
      });
    });
};

/*
 * forward backend result to the frontend.
 *
 * ex: backend.getData(req, '/api/categorys/4242').nodeify(backend.fwd(res));
 */
var fwd = function (res) {
  return function (err, data) {
    if (err) {
      res.status(500).json({error: String(err)});
    } else {
      var backendResponse = data[0]
        , backendBody = data[1];
      res.status(backendResponse.statusCode).json(backendBody);
    }
  };
};

module.exports.getData = getData;
module.exports.fwd = fwd;