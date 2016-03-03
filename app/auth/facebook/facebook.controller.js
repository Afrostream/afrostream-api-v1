'use strict';

var backend = require('../../backend');
var auth = require('../auth.controller');

exports.checkAuth = function (req, res) {
  res.noCache();
  backend.getDataWithoutAuth(req, '/auth/facebook', {followRedirect: false}).nodeify(backend.fwd(res));
};

exports.callback = function (req, res) {
  res.noCache();
  backend.getDataWithoutAuth(req, '/auth/facebook/callback', {followRedirect: false}).nodeify(auth.fwd(res));
};

exports.unlink = function (req, res) {
  res.noCache();
  backend.getData(req, '/auth/facebook/unlink', {followRedirect: false}).nodeify(auth.fwd(res));
};