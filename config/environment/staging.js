'use strict';

module.exports = {
  backendApiSecret: process.env.AFROSTREAM_API_SECRET,
  backendApiKey: process.env.AFROSTREAM_API_KEY,

  /*
   * enabling PR use of backend:
   * ex: http://api-staging.afrostream.tv/api/w00t?afrostream-api-v1.backend-base-url=https%3A//afrostream-backend-pr-389.herokuapp.com
   */
  features: {
    "afrostream-api-v1.backend-base-url": "off"
  }
};
