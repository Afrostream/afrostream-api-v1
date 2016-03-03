'use strict';

var Q = require('q');

var request = require('request');

var backend = require('../backend');

var config = require('../../config');

var _signin = function (req) {
  return Q.nfcall(request, {
    method: 'POST',
    uri: config.backend.protocol + '://' + config.backend.authority + '/auth/oauth2/token',
    json: true,
    body: {
      grant_type: 'password',
      client_id: config.afrostream.apiKey,
      client_secret: config.afrostream.apiSecret,
      username: req.body.email,
      password: req.body.password
    },
    // FIXME: abstract request api.
    headers: {
      'x-forwarded-client-ip': req.userIp,
      'x-forwarded-user-ip': req.userIp,
      'x-forwarded-user-agent': req.get('User-Agent')
    }
  }).then(ensure200OK);
};

var _refresh = function (req) {
  return Q.nfcall(request, {
    method: 'POST',
    uri: config.backend.protocol + '://' + config.backend.authority + '/auth/oauth2/token',
    json: true,
    form: {
      grant_type: 'refresh_token',
      client_id: config.afrostream.apiKey,
      client_secret: config.afrostream.apiSecret,
      refresh_token: req.body.refresh_token
    },
    // FIXME: abstract request api.
    headers: {
      'x-forwarded-client-ip': req.userIp,
      'x-forwarded-user-ip': req.userIp,
      'x-forwarded-user-agent': req.get('User-Agent')
    }
  }).then(ensure200OK);
};

var ensure200OK = function (result) {
  if (result[0].statusCode !== 200) {
    console.error('auth: error: backend status=' + result[0].statusCode + ': ', result[1]);
    var error = new Error(
      result[1] && result[1].message || // ex: { message: 'The specified email address is already in use.' }
      result[1] && result[1].error ||   // ex: { error: 'invalid_grant' }
      result[1]);
    error.statusCode = result[0].statusCode || 500;
    throw error;
  }
  return result[1];
};

var signup = function (req, res) {
  // maybe it's a signin ?
  _signin(req)
    .then(
      function (oauth2Response) {
        if (!oauth2Response.access_token) {
          throw new Error("no access_token");
        }
        return oauth2Response;
      })
    .then(
      function (oauth2Response) {
        console.log('auth: signup: -> signin: ' + req.body.email);
        res.json({
          accessToken: oauth2Response.access_token,
          refreshToken: oauth2Response.refresh_token,
          expiresIn: oauth2Response.expires_in
        });
      },
      function (err) {
        // ok, let's signup
        backend.postData(req, '/api/users/')
          .then(ensure200OK)
          .then(
            function success() {
              console.error('auth: signup: ok: ' + req.body.email + ' created');
              return signin(req, res);
            },
            function error(err) {
              console.error('auth: signup: error: ' + req.body.email + ' ' + String(err), err);
              res.status(err.statusCode || 500).json({message: String(err)});
            });
      });
};

var signin = function (req, res) {
  _signin(req)
    .then(
      function success(oauth2Response) {
        /*
         // FIXME: cookie auth.
         res.cookie('auth', {
         access_token: oauth2Response.access_token,
         expires_at: new Date(Date.now() + 1000 * oauth2Response.expires_in).toISOString()
         }, {
         domain:'.afrostream.tv',
         signed: true
         });
         */
        console.log('auth: signin: ok: ' + req.body.email);
        res.json({
          accessToken: oauth2Response.access_token,
          refreshToken: oauth2Response.refresh_token,
          expiresIn: oauth2Response.expires_in
        });
      },
      function error(err) {
        /*
         // FIXME: cookie auth.
         res.clearCookie('auth');
         */
        console.error('auth: signin: error: ' + req.body.email + ' ' + String(err), err);
        res.status(err.statusCode || 500).json({message: String(err)});
      });
};

var refresh = function (req, res) {
  _refresh(req)
    .then(
      function success(oauth2Response) {
        /*
         // FIXME: cookie auth.
         res.cookie('auth', {
         access_token: oauth2Response.access_token,
         expires_at: new Date(Date.now() + 1000 * oauth2Response.expires_in).toISOString()
         }, {
         domain:'.afrostream.tv',
         signed: true
         });
         */
        console.log('auth: signin: ok: ' + req.body.email);
        res.json({
          accessToken: oauth2Response.access_token,
          refreshToken: oauth2Response.refresh_token,
          expiresIn: oauth2Response.expires_in
        });
      },
      function error(err) {
        /*
         // FIXME: cookie auth.
         res.clearCookie('auth');
         */
        console.error('auth: refresh token : error: ' + req.body.email + ' ' + String(err), err);
        res.status(err.statusCode || 500).json({message: String(err)});
      });
};

var reset = function (req, res) {
  return backend.postData(req, '/auth/reset')
    .then(ensure200OK)
    .then(
      function success(data) {
        if (req.body.email) {
          console.error('auth: reset: ok: email ' + req.body.email);
        } else if (req.body.k) {
          console.error('auth: reset: ok: token ' + req.body.k);
        }
        res.status(200).json(data);
      },
      function error(err) {
        console.error('auth: reset: error: ' + String(err), err);
        res.status(err.statusCode || 500).json({message: String(err)});
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
      var oauth2Response = data[0]
        , oauth2Body = data[1];
      switch (oauth2Response.statusCode) {
        case 301:
        case 302:
          if (oauth2Response.headers &&
            oauth2Response.headers.location) {
            res.set('location', oauth2Response.headers.location);
          }
          break;
        default:
          break;
      }
      res.status(oauth2Response.statusCode).json({
        accessToken: oauth2Body.access_token,
        refreshToken: oauth2Body.refresh_token,
        expiresIn: oauth2Body.expires_in
      });
    }
  };
};

module.exports.refresh = refresh;
module.exports.signin = signin;
module.exports.signup = signup;
module.exports.reset = reset;
module.exports.fwd = fwd;