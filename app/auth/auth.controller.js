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
    form:{
      grant_type:'password',
      client_id: config.afrostream.apiKey,
      client_secret: config.afrostream.apiSecret,
      username:req.body.email,
      password:req.body.password
    },
    // FIXME: abstract request api.
    headers: {
      'x-forwarded-clientip': req.clientIp, // FIXME: to be removed
      'x-forwarded-client-ip': req.clientIp,
      'x-forwarded-user-agent': req.get('User-Agent')
    }
  }).then(ensure200OK);
};

var ensure200OK = function (result) {
  if (result[0].statusCode !== 200) {
    console.error('auth: error: backend status='+result[0].statusCode+': ', result[1]);
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
      res.json({accessToken: oauth2Response.access_token});
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
          res.status(err.statusCode || 500).json({message:String(err)});
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
      res.json({accessToken: oauth2Response.access_token});
    },
    function error(err) {
      /*
        // FIXME: cookie auth.
        res.clearCookie('auth');
      */
      console.error('auth: signin: error: ' + req.body.email + ' ' + String(err), err);
      res.status(err.statusCode || 500).json({message:String(err)});
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
      res.status(err.statusCode || 500).json({message:String(err)});
    });
};

module.exports.signin = signin;
module.exports.signup = signup;
module.exports.reset = reset;