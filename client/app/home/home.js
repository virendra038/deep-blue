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
            .state('allEntries', {
                title: 'All ENtries',
                url: '/memories?search',
                templateUrl: 'app/allEntries/allEntries.html',
                controller: 'allEntriesCtrl',
                controllerAs: 'ctrl',
                isAuthenticated: false,
                params:{
                    search:{
                        value:'',
                        squash:true
                    }
                },
                meta: {
                    'description': 'Carve your precious memories | Introspectum.com'
                }
            })
    }]);