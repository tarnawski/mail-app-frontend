(function() {
  'use strict';

  angular
    .module('mailApp')
    .directive('navbarDashboard', navbarDashboard);

  /** @ngInject */
  function navbarDashboard($state, authService, store) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/directives/navbar-dashboard/navbar-dashboard.html',
      controller: navbarDashboardController,
      controllerAs: 'navbarDashboard',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function navbarDashboardController() {

      var vm = this;
      vm.logout = logoutUser;

      activate();

      ////////////

      function activate() {
        vm.currentUser  = store.get('currentUser');
      }

      function logoutUser() {
        authService.logout();
        $state.go('login', {message: 'Zostałeś popranie wylogowany'});
      }
    }
  }

})();
