'use strict';

var backend = require('../../backend');
var auth = require('../auth.controller');

exports.signin = function (req, res) {
  res.noCache();
  backend.getDataWithoutAuth(req, '/auth/facebook/signin', {followRedirect: false}).nodeify(backend.fwd(res));
};

exports.signup = function (req, res) {
  res.noCache();
  backend.getDataWithoutAuth(req, '/auth/facebook/signup', {followRedirect: false}).nodeify(backend.fwd(res));
};

exports.link = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/facebook/link', {followRedirect: false}).nodeify(backend.fwd(res));
};

exports.unlink = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/facebook/unlink', {followRedirect: false}).nodeify(auth.fwd(res));
};

exports.callback = function (req, res) {
  res.noCache();
  backend.getDataWithoutAuth(req, '/auth/facebook/callback', {followRedirect: false}).nodeify(auth.fwd(res));
};
