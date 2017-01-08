(function () {
    'use strict';
    /*
     */
    var deep_blue = angular.module('deep-blue', [
         'ngCookies',
         'ngResource',
         'ngSanitize',
         'ui.router',
         'angularMoment',
         'ngMessages',
         'ngMaterial',
         'treasure-overlay-spinner',
         'duScroll',
         'ngMeta',
         '720kb.socialshare',
         'jkuri.gallery',
         'angularLazyImg'
    ]);

    deep_blue.constant("deepBlueConstant", {
        "baseUrl": apiEndPointConfig
    });
    deep_blue.config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

             $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
             $httpProvider.interceptors.push('authInjector');

        }]);
    deep_blue.factory('authInjector', function ($rootScope, $q, $cookieStore, $location) {
        var authInjector = {
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('auth-token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('auth-token');
                }

                return config;
            },
            responseError: function (res) {
                if (res.status === 401) {
                    $location.path('/');
                    $cookieStore.remove('auth-token');
                    return $q.reject(res);
                }
                else {
                    return $q.reject(res);
                }
            }
        };
        return authInjector;
    });

    deep_blue.run(['$rootScope','$cookies','$cookieStore','$mdToast',
        function ($rootScope, $cookies, $cookieStore, $mdToast) {

            if ($cookies.get('tokenSocial')) {
                //  console.log($cookies.get('tokenGoogle'));
                // console.log($cookieStore.get('auth-token'));

                if ($cookieStore.get('auth-token') == undefined) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('You have been successfully logged in!')
                            .position('top right')
                            .hideDelay(300)
                    );
                    var tokenSocial = $cookies.get('tokenSocial');
                    $cookieStore.put('auth-token', tokenSocial);

                }
                $rootScope.isLoggedIn =  true;
            }

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

                window.document.title = toState.title + " @Introspectum";

            });

        }]);
}());