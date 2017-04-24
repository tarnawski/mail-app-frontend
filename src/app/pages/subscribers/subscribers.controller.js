(function () {
  'use strict';

  angular
    .module('mailApp.subscribers')
    .controller('SubscribersController', SubscribersController);

  /** @ngInject */
  function SubscribersController(communicationFactory, $state, $stateParams, $timeout) {

    var vm = this;
    vm.pushMessage = pushMessage;
    vm.getData = getData;
    vm.remove = remove;

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
        communicationFactory.subscribers.query(
            function (data) {
                vm.subscribers = data;
            },
            function () {
                $state.go('dashboard', {message: 'Error'});
            }
        );
    }

    function remove(id) {
        communicationFactory.subscribers.delete({id: id},
            function () {
                $state.go($state.current, {message: 'Subscriber properly removed'}, {reload: true});
            },
            function () {
                $state.go('dashboard', { message: 'Something wrong. Please try again later ... ' });
            }
        );
    }
  }
})();
