'use strict';

// Production specific configuration
// =================================
module.exports = {
  afrostream: {
    apiSecret: process.env.AFROSTREAM_API_SECRET,
    apiKey: process.env.AFROSTREAM_API_KEY
  },
  allowOrigin: {
    url: process.env.ALLOW_URL
  }
};
