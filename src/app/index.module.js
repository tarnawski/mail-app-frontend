(function() {
  'use strict';

  angular
    .module('mailApp', [
      // Plugins
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'toaster',
      'angular-storage',
      'ui.select',

        // App modules
      'mailApp.login',
      'mailApp.register',
      'mailApp.home',
      'mailApp.dashboard',
      'mailApp.groups',
      'mailApp.subscribers'
    ]);

})();
