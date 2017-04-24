(function ()
{
    'use strict';

    angular
        .module('mailApp.login')
        .config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider) {
$stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'app/pages/login/login.html',
    controller: 'LoginController',
    controllerAs: 'login',
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
      requireAuth: false
    }
  });
}

})();
