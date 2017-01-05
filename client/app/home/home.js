'use strict';

angular.module('deep-blue')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
                title: 'Carve your precious memories ',
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home',
                isAuthenticated: false,
                meta: {
                    'description': 'Carve your precious memories | Introspectum.com'
                }
            })
    }]);