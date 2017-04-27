(function () {
    'use strict';

    angular
        .module('mailApp.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(communicationFactory, store, $state, $stateParams, $timeout, CONSTANTS) {

        var vm = this;
        vm.pushMessage = pushMessage;
        vm.getStatus = getStatus;
        vm.getGroups = getGroups;
        vm.addGroup = addGroup;
        vm.addSubscriber = addSubscriber;
        vm.generateEml = generateEml;
        vm.generateCsv = generateCsv;
        vm.removeGroup = removeGroup;

        activate();

        ///////////////

        function activate() {
            if ($stateParams.message) {
                pushMessage($stateParams.message, 5000);
            }
            vm.currentUser = store.get('currentUser');
            getStatus();
            getGroups();
        }

        function pushMessage(message, time) {
            vm.count = true;
            vm.info = message;
            $timeout(function () {
                vm.count = false;
            }, time);
        }

        function getStatus() {
            communicationFactory.status.get(
                function (data) {
                    vm.status = data;
                },
                function () {
                    $state.go('dashboard', {message: 'Something went wrong. Please try again...'});
                }
            );
        }

        function getGroups() {
            communicationFactory.groups.query(
                function (data) {
                    vm.groups = data;
                },
                function () {
                    $state.go('dashboard', {message: 'Something went wrong. Please try again...'});
                }
            );
        }

        function addGroup() {
            communicationFactory.groups.save({ name: vm.newGroupName },
                function (data) {
                    $state.go($state.current, {message: 'Group '+ data.name +' properly added!'}, {reload: true});
                },
                function () {
                    $state.go($state.current, {message: 'Something went wrong. Please try again...'}, {reload: true});
                }
            );
        }

        function addSubscriber() {
            alert('Coming soon...');
        }

        function generateEml(id) {
            var accessToken = vm.currentUser.access_token;
            location.href = CONSTANTS.BASE_URL_API + "/api/export-eml/groups/" + id + "?access_token=" + accessToken;
        }

        function generateCsv(id) {
            var accessToken = vm.currentUser.access_token;
            location.href = CONSTANTS.BASE_URL_API + "/api/export-csv/groups/" + id + "?access_token=" + accessToken;
        }

        function removeGroup(id) {
            communicationFactory.groups.delete({id: id},
                function () {
                    $state.go($state.current, {message: 'Group properly removed!'}, {reload: true});
                },
                function () {
                    $state.go($state.current, { message: 'Something went wrong. Please try again...' }, {reload: true});
                }
            );
        }
    }
})();
