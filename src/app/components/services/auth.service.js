(function (){
    'use strict';
    angular
        .module('mailApp')
        .service('authService', authService);

    /** @ngInject */
    function authService($http, CONSTANTS, store, $rootScope, $log, $q, $state) {

        // Endpoints
        var userInfoUrl = CONSTANTS.BASE_URL_API + '/api/profile';
        var defaultLoginUrl = CONSTANTS.BASE_URL_API + CONSTANTS.OAUTH.TOKEN_URL;
        var defaultRegisterUrl = CONSTANTS.BASE_URL_API + '/api/register';

        // Public
        var service = {
            getCurrentUser: getCurrentUser,
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            isUserAllowed: isUserAllowed,
            refreshToken: refreshToken,
            register: register
        };

        return service;

        //////////////

        function getUserInfo(tokenInformation){
            return $http.get(userInfoUrl)
                .then(function(response){
                    // Merge data from currentUser and login endpoints
                    var userInfo = angular.extend({}, response.data, tokenInformation);

                    return userInfo;
                });
        }

        function defaultLogin(credentials) {

          var params = {
                username: credentials.username,
                password: credentials.password,
                client_id: CONSTANTS.OAUTH.CLIENT_ID,
                client_secret: CONSTANTS.OAUTH.CLIENT_SECRET,
                grant_type: 'password'
            };
            return $http.post(defaultLoginUrl, params);
        }

        function refreshToken() {
            var currentUser = getCurrentUser();
            if (typeof currentUser  == 'undefined') {
                $state.go('login', { message: 'You have to log in to process'});
                return $q.reject("You have to log in to process");
            }

            store.remove('currentUser');

            var params = {
                client_id: CONSTANTS.OAUTH.CLIENT_ID,
                client_secret: CONSTANTS.OAUTH.CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: currentUser.refresh_token
            };
            return $http.post(defaultLoginUrl, params);
        }


        //Shared method for default login, facebook login and refresh token
        function login(provider, credentials) {

            var request;
            switch (provider) {
                case CONSTANTS.OAUTH.PROVIDERS.REFRESH_TOKEN:
                    request = refreshToken();
                    break;
                default:
                    request = defaultLogin(credentials);
            }

          return request
            // Step 1: Get access token, refresh token, expired and token type
                .then(function (response) {
                    var tokenInformation = {
                        access_token: response.data.access_token,
                        refresh_token: response.data.refresh_token,
                        token_type: response.data.token_type,
                        expires_in: response.data.expires_in
                    };

                    // Temporary store access_token in local storage
                    store.set('currentUser', tokenInformation);

                  return tokenInformation;
                })
                // Step 2: Get user data: username, email etc. and merge it with data from step 1
                .then(function (tokenInformation) {
                    return getUserInfo(tokenInformation);
                })
                // Step 3: Get merged data from Step 2 then set all in Local Storage
                .then(function (userInfo) {
                    store.set('currentUser', userInfo);
                    $rootScope.$broadcast('user:LoggedIn');
                    return userInfo;
                })
                .catch(function (error) {
                    return onCatch(error);
                });
        }

        function logout(){
            store.remove('currentUser');
            $rootScope.$broadcast('user:LoggedOut');
        }

        function getCurrentUser(){
            return store.get('currentUser');
        }

        function isAuthenticated(){
            var user = getCurrentUser();
            return angular.isObject(user) &&
                user.hasOwnProperty('access_token') &&
                user.hasOwnProperty('refresh_token') &&
                user.hasOwnProperty('username');
        }

        function isUserAllowed(state){
            // State is not restricted or user is authenticated
            if(!state.data.requireAuth || isAuthenticated()){
                return true;
            }
            // State is restricted and user is not authenticated
            return false;
        }

        function onCatch(error) {
            if ((error.status >= 400) && (error.status < 500)) {
                if (error.data.error_description) {
                    return $q.reject(error.data.error_description);
                }
                else {
                    return $q.reject();
                }
            }
            return $q.reject();
        }

        function register(user) {
            var params = {
                username: user.username,
                email: user.email,
                password: user.password,
                client_id: CONSTANTS.OAUTH.CLIENT_ID,
                client_secret: CONSTANTS.OAUTH.CLIENT_SECRET
            };

            return $http.post(defaultRegisterUrl, params);
        }
    }
})();
