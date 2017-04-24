(function() {
    'use strict';

    angular
        .module('mailApp')
        .factory('authInterceptor', authInterceptor);

    /** @ngInject */
    function authInterceptor($log, $q, $rootScope, store, toaster) {
        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        function request(config) {
          var currentUser = store.get('currentUser');
          if(angular.isObject(currentUser) && angular.isString(currentUser.access_token)) {
            config.headers.Authorization = 'Bearer ' + currentUser.access_token;
          }
          return config;
        }

        function requestError(reason) {
          return $q.reject(reason);
        }

        function response(resp) {
          return resp;
        }

        function responseError(reason) {
          switch(reason.status){
              case -1:
                  toaster.pop('error', "Error", "Internet connection interrupted");
                  break;
              case 401:
                  $rootScope.$broadcast('request:Unauthorized');
                  break;
              case 500:
                  toaster.pop('error', "Error", "Can't connect to server, please try later");
                  break;
            }
          return $q.reject(reason);
        }
    }
})();
