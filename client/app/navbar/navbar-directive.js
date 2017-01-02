/**
 * Created by viren on 26/12/16.
 */


(function () {
    'use strict';

    angular.module('deep-blue')
        .directive('navbarDirective', function () {

            return {
                restrict: 'EA',
                controller: ['$scope','userAuthenticationService','$state','$rootScope',
                    function ($scope, userAuthenticationService, $state, $rootScope) {

                        var self = this;

                        $scope.isLoggedIn = userAuthenticationService.isLoggedIn();

                        $scope.logout = function(){
                            $state.go('home');
                            userAuthenticationService.logout();
                        };


                    }],
                controllerAs: 'nav',
                templateUrl: 'app/navbar/navbar.html'

            }

        })
}());