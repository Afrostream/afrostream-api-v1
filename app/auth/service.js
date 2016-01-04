'use strict';

function isAuthenticated() {
  return function (req, res, next) {
    next();
  };
}

exports.isAuthenticated = isAuthenticated;
