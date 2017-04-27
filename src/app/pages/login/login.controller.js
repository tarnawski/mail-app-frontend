(function() {
  'use strict';

  angular
    .module('mailApp.login')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(authService, CONSTANTS, $stateParams) {

    var vm = this;
    vm.signIn = signIn;

    activate();

    ////////////////

    function activate() {
      if($stateParams.message) {
        vm.successResponse = $stateParams.message;
      }
    }

    function signIn() {
      return authService.login(CONSTANTS.OAUTH.PROVIDERS.DEFAULT, vm.user)
        .catch(setErrorMessage);
    }

    function setErrorMessage() {
      vm.successResponse = "";
      vm.errorResponse = "Login or password is invalid!";
    }
  }
})();
