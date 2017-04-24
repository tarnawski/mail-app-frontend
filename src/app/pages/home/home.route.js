(function ()
{
    'use strict';

    angular
        .module('mailApp.home')
        .config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider) {
$stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/pages/home/home.html',
    controller: 'HomeController',
    controllerAs: 'home',
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
