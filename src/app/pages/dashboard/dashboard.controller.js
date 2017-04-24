(function () {
  'use strict';

  angular
    .module('mailApp.dashboard')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(communicationFactory, $state, $stateParams, $timeout) {

    var vm = this;
    vm.pushMessage = pushMessage;
    vm.getData = getData;

      activate();

    ///////////////

    function activate() {
        if($stateParams.message) {
            pushMessage($stateParams.message, 5000);
        }
        getData();
    }

      function pushMessage(message, time){
          vm.count = true;
          vm.info = message;
          $timeout(function () { vm.count = false; }, time);
      }

      function getData() {
          communicationFactory.status.get(
              function (data) {
                  vm.status = data;
              },
              function () {
                  $state.go('dashboard', {message: 'Error'});
              }
          );
      }
  }
})();
