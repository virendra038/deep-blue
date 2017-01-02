'use strict';

angular.module('deep-blue')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('profile', {
                title: 'User profile',
                url: '/profile',
                templateUrl: 'app/account/profile/profile.html',
                controller: 'profileCtrl',
                controllerAs: 'ctrl',
                isAuthenticated: true

            })
    }]);