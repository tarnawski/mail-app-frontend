(function() {
  'use strict';

  angular
    .module('mailApp.register')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController(authService, $state, $stateParams) {

    var vm = this;
    vm.register = register;

    activate();

    ////////////////

    function activate() {
      if($stateParams.message) {
        vm.successResponse = $stateParams.message;
      }
    }

    function register() {
      authService.register(vm.user)
          .then(function () {
              $state.go('login', { message: 'Poprawnie zarejestrowano, możesz się teraz zalogować'});
          }, function () {
              setErrorMessage();
          });
    }

    function setErrorMessage() {
      vm.successResponse = "";
      vm.errorResponse = "Adres email został już użyty";
    }
  }
})();
