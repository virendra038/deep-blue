"use strict";

angular.module('deep-blue')
    .controller('diaryContentCtrl', ['$scope','$timeout', '$mdSidenav','userService','$filter','$mdDialog',
        function ($scope, $timeout, $mdSidenav, userService, $filter, $mdDialog) {

            var self = this;

            self.toggleLeft = buildToggler('left');
            self.toggleRight = buildToggler('right');
            self.entry = '';
            self.entries = {};

            var getEntry = function(){
                userService.getEntries()
                    .then(function(response){
                     //   console.log(response.data);
                        self.entries = response.data.entries;
                    },function(err){
                        console.log(err);
                    })
            };

            getEntry();

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

            self.getEntry = function(date,ev){

                var entryDate = $filter('date')(date,'yyyy-MM-dd');

                $mdDialog.show({
                    controller: 'entryDialogCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: 'app/diaryContent/entryDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:false,
                    locals: {
                        entryDate: entryDate
                    }
                });


            };



        }]);