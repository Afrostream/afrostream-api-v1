'use strict';

/**
 * req.clientip will contain the client ip
 *   searching in the header fastly-client-ip
 *   or in heroku x-forwarded-for list
 *   or in req.ip
 * @param options
 * @returns {Function}
 */
module.exports = function (options) {
  return function (req, res, next) {
    if (req.get('x-forwarded-for')) {
      // assuming we are on heroku ... (might be false)
      //  the client is the first one (left) in the list of x-forwarded-for
      //  heroku router ip is in req.ip
      // we trim the result.
      req.clientip = req.get('fastly-client-ip') || String(req.get('x-forwarded-for').split(',').shift() || req.ip).replace(/^\s+|\s+$/g, '');
    } else {
      req.clientip = req.ip;
    }
    next();
  };
};