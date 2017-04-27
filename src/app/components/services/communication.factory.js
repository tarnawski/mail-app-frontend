(function ()
{
    'use strict';
    angular
        .module('mailApp')
        .service('communicationFactory', communicationFactory);

    /** @ngInject */
    function communicationFactory($resource, CONSTANTS) {
        return {
            status: $resource(CONSTANTS.BASE_URL_API + '/api/status'),
            profile: $resource(CONSTANTS.BASE_URL_API + '/api/profile'),
            subscribers: $resource(CONSTANTS.BASE_URL_API + '/api/subscribers/:id',{id: '@_id'}),
            groups: $resource(CONSTANTS.BASE_URL_API + '/api/groups/:id',{id: '@_id'}),
        };
    }
})();
