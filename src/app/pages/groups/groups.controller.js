(function () {
  'use strict';

  angular
    .module('mailApp.groups')
    .controller('GroupsController', GroupsController);

  /** @ngInject */
  function GroupsController(communicationFactory, $state, $stateParams, $timeout) {

    var vm = this;
    vm.pushMessage = pushMessage;
    vm.getData = getData;
    vm.create = create;
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
        communicationFactory.groups.query(
            function (data) {
                vm.groups = data;
            },
            function () {
                $state.go('dashboard', {message: 'Error'});
            }
        );
    }
      function create(id) {
          var data = {
              name: vm.name,
          };

          communicationFactory.groups.save(data,
              function () {
                  $state.go($state.current, {message: 'Group properly added'}, {reload: true});
              },
              function () {
                  $state.go('dashboard', {message: 'Error'});
              }
          );

      }
    function remove(id) {
        communicationFactory.groups.delete({id: id},
            function () {
                $state.go($state.current, {message: 'Group properly removed'}, {reload: true});
            },
            function () {
                $state.go('dashboard', { message: 'Something wrong. Please try again later ... ' });
            }
        );
    }
  }
})();
