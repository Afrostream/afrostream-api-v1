'use strict';

module.exports = {
  backendApiKey: process.env.AFROSTREAM_API_KEY,
  backendApiSecret: process.env.AFROSTREAM_API_SECRET,

  cors: {
    'Access-Control-Allow-Origin': 'https://www.afrostream.tv'
  }
};
