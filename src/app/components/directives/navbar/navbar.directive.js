(function () {
    'use strict';

    angular
        .module('mailApp')
        .directive('navbar', navbar);

    /** @ngInject */
    function navbar($state, authService, store, $window, $location, $anchorScroll) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/directives/navbar/navbar.html',
            scope: {
                type: '@'
            },
            controller: navbarController,
            controllerAs: 'navbar',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function navbarController() {

            var vm = this;
            vm.logout = logoutUser;
            vm.gotoHome = gotoHome;
            vm.gotoFeatures = gotoFeatures;
            vm.gotoDocumentation = gotoDocumentation;
            vm.gotoExamples = gotoExamples;

            activate();

            ////////////

            function activate() {
                vm.currentUser = store.get('currentUser');

                if (vm.type == "homepage") {
                    angular.element('.navbar-default').addClass("navbar-transparent");
                    angular.element('.navbar-default').removeClass("navbar-blue");
                }
                angular.element($window).bind("scroll", function () {
                    if (vm.type == "homepage" && this.pageYOffset <= 50) {
                        angular.element('.navbar-default').addClass("navbar-transparent");
                        angular.element('.navbar-default').removeClass("navbar-blue");
                    } else {
                        angular.element('.navbar-default').addClass("navbar-blue");
                        angular.element('.navbar-default').removeClass("navbar-transparent");
                    }

                });

            }

            function gotoHome() {
                $state.go('home', {'#': 'home'});
                $location.hash('home');
                $anchorScroll.yOffset = 50;
                $anchorScroll();
            }

            function gotoFeatures() {
                $state.go('home', {'#': 'features'});
                $location.hash('features');
                $anchorScroll.yOffset = 50;
                $anchorScroll();
            }

            function gotoDocumentation() {
                $state.go('home', {'#': 'documentation'});
                $location.hash('documentation');
                $anchorScroll.yOffset = 50;
                $anchorScroll();
            }

            function gotoExamples() {
                $state.go('home', {'#': 'examples'});
                $location.hash('examples');
                $anchorScroll.yOffset = 50;
                $anchorScroll();
            }

            function logoutUser() {
                authService.logout();
                $state.go('login');
            }
        }
    }

})();
