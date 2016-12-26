'use strict';

angular.module('deep-blue')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
                title: 'Carve your precious memories @deepblue.com',
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home',
                requireauth: false,
                meta: {
                    'description': 'Carve your precious memories @introspectum.com'
                }
            })
    }]);