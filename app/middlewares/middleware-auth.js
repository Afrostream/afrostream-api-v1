'use strict';

module.exports = function (options) {
  return function (req, res, next) {
    req.userAccessToken = req.get('Access-Token') || req.query.afro_token;
    next();
  };
};