'use strict';

var backend = require('../../backend');
var auth = require('../auth.controller');

exports.signin = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/bouygues/signin', {followRedirect: false}).nodeify(backend.fwd(res));
};

exports.signup = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/bouygues/signup', {followRedirect: false}).nodeify(backend.fwd(res));
};

exports.link = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/bouygues/link', {followRedirect: false}).nodeify(backend.fwd(res));
};

exports.unlink = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/bouygues/unlink', {followRedirect: false}).nodeify(auth.fwd(res));
};

exports.callback = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/bouygues/callback', {followRedirect: false}).nodeify(auth.fwd(res));
};
