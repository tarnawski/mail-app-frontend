(function() {
  'use strict';

  angular
    .module('mailApp.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(communicationFactory, $state) {

      var vm = this;

      activate();

      ///////////////

      function activate() {
      }
  }
})();
