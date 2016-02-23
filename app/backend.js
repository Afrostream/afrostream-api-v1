'use strict';

var config = require('../config');

var request = require('request');

var Q = require('q');

var _ = require('lodash');

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
    body: {
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
var getData = function (req, path, requestOptions) {
  return getToken()
    .then(function (token) {
      var queryOptions = _.merge({}, { access_token: token.access_token }, req.query || {});

      // FIXME: this code should be removed after cookie auth
      // BEGIN REMOVE
      if (req.userAccessToken) {
        queryOptions.access_token = req.userAccessToken;
      }
      // END REMOVE

      return Q.nfcall(
        request,
        _.merge(
          {
            method: 'GET',
            json: true,
            qs: queryOptions,
            uri: config.backend.protocol + '://' + config.backend.authority + path,
            headers: {
              'x-forwarded-client-ip': req.userIp,
              'x-forwarded-user-ip': req.userIp,
              'x-forwarded-user-agent': req.get('User-Agent')
            },
            oauth: {
              consumer_key: config.afrostream.apiKey,
              consumer_secret: config.afrostream.apiSecret
              // token: token.access_token // <= FIXME: access token should be here, but the backend doesn't allow it ?!
            }
          },
          requestOptions || {}
        )
      );
    });
};

/**
 * call the backend (POST), return the result
 */
var postData = function (req, path) {
  return getToken()
    .then(function (token) {
      var queryOptions = _.merge({}, req.query || {});
      // priority for body.access_token is : body > headers['Access-Token'] > token.access_token
      var accessToken = req.userAccessToken || token.access_token;
      var bodyOptions = _.merge({}, { access_token: accessToken }, req.body || {} );
      //
      return Q.nfcall(request, {
        method: 'POST',
        json: true,
        qs: queryOptions,
        body: bodyOptions,
        uri: config.backend.protocol + '://' + config.backend.authority + path,
        headers: {
          'x-forwarded-client-ip': req.userIp,
          'x-forwarded-user-ip': req.userIp,
          'x-forwarded-user-agent': req.get('User-Agent')
        },
        oauth: {
          consumer_key: config.afrostream.apiKey,
          consumer_secret: config.afrostream.apiSecret
          // token: token.access_token // <= FIXME: access token should be here, but the backend doesn't allow it ?!
        }
      });
    });
};


/**
 * PUT
 */
var putData = function (req, path) {
  return getToken()
    .then(function (token) {
      var queryOptions = _.merge({}, req.query || {});
      // priority for body.access_token is : body > headers['Access-Token'] > token.access_token
      var accessToken = req.userAccessToken || token.access_token;
      var bodyOptions = _.merge({}, { access_token: accessToken }, req.body || {} );
      //
      return Q.nfcall(request, {
        method: 'PUT',
        json: true,
        qs: queryOptions,
        body: bodyOptions,
        uri: config.backend.protocol + '://' + config.backend.authority + path,
        headers: {
          'x-forwarded-client-ip': req.userIp,
          'x-forwarded-user-ip': req.userIp,
          'x-forwarded-user-agent': req.get('User-Agent')
        },
        oauth: {
          consumer_key: config.afrostream.apiKey,
          consumer_secret: config.afrostream.apiSecret
          // token: token.access_token // <= FIXME: access token should be here, but the backend doesn't allow it ?!
        }
      });
    });
};


/**
 * DELETE
 */
var deleteData = function (req, path) {
  return getToken()
    .then(function (token) {
      var queryOptions = _.merge({}, req.query || {});
      // priority for body.access_token is : body > headers['Access-Token'] > token.access_token
      var accessToken = req.userAccessToken || token.access_token;
      var bodyOptions = _.merge({}, { access_token: accessToken }, req.body || {} );
      //
      return Q.nfcall(request, {
        method: 'DELETE',
        json: true,
        qs: queryOptions,
        body: bodyOptions,
        uri: config.backend.protocol + '://' + config.backend.authority + path,
        headers: {
          'x-forwarded-client-ip': req.userIp,
          'x-forwarded-user-ip': req.userIp,
          'x-forwarded-user-agent': req.get('User-Agent')
        },
        oauth: {
          consumer_key: config.afrostream.apiKey,
          consumer_secret: config.afrostream.apiSecret
          // token: token.access_token // <= FIXME: access token should be here, but the backend doesn't allow it ?!
        }
      });
    });
};

/**
 * call this method when you don't need the token (faster & safer)
 * @param req
 * @param path
 */
var getDataWithoutAuth = function (req, path, requestOptions) {
    return Q.nfcall(request,
      _.merge(
        {
          method: 'GET',
          json: true,
          qs: req.query,
          uri: config.backend.protocol + '://' + config.backend.authority + path,
          headers: {
            'x-forwarded-client-ip': req.userIp,
            'x-forwarded-user-ip': req.userIp,
            'x-forwarded-user-agent': req.get('User-Agent')
          }
        },
        requestOptions || {}
      )
    );
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
      switch (backendResponse.statusCode) {
        case 301:
        case 302:
          if (backendResponse.headers &&
              backendResponse.headers.location) {
            res.set('location', backendResponse.headers.location);
          }
          break;
        default:
          break;
      }
      res.status(backendResponse.statusCode).json(backendBody);
    }
  };
};

module.exports.getDataWithoutAuth = getDataWithoutAuth;
module.exports.getData = getData;
module.exports.postData = postData;
module.exports.putData = putData;
module.exports.deleteData = deleteData;
module.exports.fwd = fwd;