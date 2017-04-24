(function() {
  'use strict';

  angular
    .module('mailApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock(CONSTANTS, $rootScope, $state, authService){

    $rootScope.$on('request:Unauthorized', onUnauthorized);
    $rootScope.$on('user:LoggedIn', onUserLoggedIn);
    $rootScope.$on('user:LoggedOut', onUserLoggedOut);
    $rootScope.$on('user:RefreshedToken', onUserRefreshedToken);
    $rootScope.$on('$stateChangeStart', onStateChangeStart);

    function onUnauthorized() {
      authService.login(CONSTANTS.OAUTH.PROVIDERS.REFRESH_TOKEN)
        .catch(function() {
          $state.go('login', { message: 'You have to log in to process'});
        });
    }

    function onUserLoggedIn() {
      $state.go('dashboard');
    }

    function onUserLoggedOut() {
      $state.go('login');
    }

    function onUserRefreshedToken() {
      $state.go('dashboard', { message: 'Your session has been refreshed' });
    }

    function onStateChangeStart(event, toState) {

      var isUserAllowed = authService.isUserAllowed(toState);

      if(!isUserAllowed){
        event.preventDefault();
        $state.go('login');
      }
    }

  }
})();
