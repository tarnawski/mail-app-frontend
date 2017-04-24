(function() {
  'use strict';

  angular
    .module('mailApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($urlRouterProvider) {
    // Default behaviour
    $urlRouterProvider.otherwise('/');
  }

})();
