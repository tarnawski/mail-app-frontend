(function() {
  'use strict';

  angular
    .module('mailApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Push interceptor
    $httpProvider.interceptors.push('authInterceptor');
  }

})();
