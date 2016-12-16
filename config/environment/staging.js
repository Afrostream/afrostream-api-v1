'use strict';

module.exports = {
  backendApiSecret: process.env.AFROSTREAM_API_SECRET,
  backendApiKey: process.env.AFROSTREAM_API_KEY,

  cors: {
    'Access-Control-Allow-Origin': 'https://staging.afrostream.tv'
  }
};
