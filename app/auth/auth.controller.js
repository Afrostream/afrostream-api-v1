'use strict';

var Q = require('q');

var request = require('request');

var backend = require('../backend');

var config = require('../../config');

var ensure200OK = function (result) {
  if (result[0].statusCode !== 200) {
    throw new Error(result[1]);
  }
  return result[1];
};

var signup = function (req, res) {
  return backend.postData(req, '/api/users/')
    .then(ensure200OK)
    .then(
    function success() {
      console.error('auth: signup: ok: ' + req.body.email + ' created');
      return signin(req, res);
    },
    function error(err) {
      console.error('auth: signup: error: ' + req.body.email + ' ' + String(err), err);
      res.status(500).json({message:String(err)});
    });
};

var signin = function (req, res) {
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
    }
  }).then(ensure200OK)
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
      res.status(500).json({message:String(err)});
    });
};

module.exports.signin = signin;
module.exports.signup = signup;