'use strict';

// Production specific configuration
// =================================
module.exports = {
  root: path.normalize(__dirname + '/../..'),
  afrostream: {
    apiSecret: process.env.AFROSTREAM_API_SECRET,
    apiKey: process.env.AFROSTREAM_API_KEY
  },
  allowOrigin: {
    url: process.env.ALLOW_URL
  }
};
