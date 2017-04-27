/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('mailApp')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('CONSTANTS',{
      BASE_URL_API: 'http://mailapp-api.ttarnawski.usermd.net',
      OAUTH: {
        CLIENT_ID: '1_69xzvcmvpscooswgk8kc8kg08088c8ws0swso0cgogog80kwoo',
        CLIENT_SECRET: '3qm0j3k82dog4ss8kokks4k0ow4so8cso0scoscck0ok0wwg84',
        TOKEN_URL: '/oauth/v2/token',
        STORAGE_KEYS: [
          'access_token',
          'refresh_token',
          'token_type',
          'expires_in'
        ],
      PROVIDERS: {
        DEFAULT: 1,
        REFRESH_TOKEN: 2
      }
      }
    });
})();
