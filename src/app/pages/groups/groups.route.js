(function () {
  'use strict';

  angular
    .module('mailApp.groups')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('groups', {
        url: '/groups',
        templateUrl: 'app/pages/groups/groups.html',
        controller: 'GroupsController',
        controllerAs: 'groups',
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
