/**
 * Created by viren on 26/12/16.
 */


(function () {
    'use strict';

    angular.module('deep-blue')
        .directive('footerDirective', function () {

            return {
                restrict: 'EA',
                controller: ['$scope',
                    function ($scope) {

                        var self = this;


                    }],
                controllerAs: 'nav',
                templateUrl: 'app/footer/footer.html'

            }

        })
}());