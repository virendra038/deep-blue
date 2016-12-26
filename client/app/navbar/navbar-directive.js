/**
 * Created by viren on 26/12/16.
 */


(function () {
    'use strict';

    angular.module('deep-blue')
        .directive('navbarDirective', function () {

            return {
                restrict: 'EA',
                controller: ['$scope',
                    function ($scope) {

                        var self = this;


                    }],
                controllerAs: 'nav',
                templateUrl: 'app/navbar/navbar.html'

            }

        })
}());