"use strict";

angular.module('deep-blue')
    .controller('diaryContentCtrl', ['$scope','$timeout', '$mdSidenav','userService',
        function ($scope, $timeout, $mdSidenav, userService) {

            var self = this;

            self.toggleLeft = buildToggler('left');
            self.toggleRight = buildToggler('right');
            self.entry = '';

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                }
            }

            self.date = moment().format('LL');

            self.addEntry = function(){
                var data = {
                  entry:self.entry
                };
                userService.entry(data)
                    .then(function(response){
                        console.log(response);
                    },function(err){
                        console.log(err);
                    })
            };

        }]);