(function () {
  'use strict';

  angular
    .module('mailApp.subscribers')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('subscribers', {
        url: '/subscribers',
        templateUrl: 'app/pages/subscribers/subscribers.html',
        controller: 'SubscribersController',
        controllerAs: 'subscribers',
        params: {
          message: null
        },
        resolve: {
          message: /* @ngInject */
            function ($stateParams) {
              return $stateParams.message;
            }
        },
        data: {
          requireAuth: true
        }
      });
  }

})();
