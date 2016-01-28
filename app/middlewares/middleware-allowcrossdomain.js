'use strict';

var config = require('../../config');

module.exports = function (options) {
  options = options || {};
  var origin = options.origin || '*';
  var headers = options.headers || '';

  return function (req, res, next) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, ' + headers);
    // allowing preflight
    if (req.method === 'OPTIONS') {
      res.send();
    } else {
      next();
    }
  };
};