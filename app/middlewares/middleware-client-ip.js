'use strict';

/**
 * req.clientIp will contain the client ip
 *   searching in the header fastly-client-ip
 *   or in heroku x-forwarded-for list
 *   or in req.ip
 * @param options
 * @returns {Function}
 */
module.exports = function (options) {
  return function (req, res, next) {
    // assuming we are on heroku ... (might be false)
    //  the client is the first one (left) in the list of x-forwarded-for
    //  heroku router ip is in req.ip
    // we trim the result.
    req.clientIp = req.get('fastly-client-ip') || String(req.get('x-forwarded-for').split(',').shift() || req.ip).replace(/^\s+|\s+$/g, '');
    //
    next();
  };
};