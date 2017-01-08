"use strict";

angular.module('deep-blue')
    .controller('diaryContentCtrl', ['$scope','$timeout', '$mdSidenav','userService','$filter','$mdDialog','$mdToast',
        function ($scope, $timeout, $mdSidenav, userService, $filter, $mdDialog, $mdToast) {

            var self = this;

            self.toggleLeft = buildToggler('left');
            self.toggleRight = buildToggler('right');
            self.entry = '';
            self.title = '';
            self.entries = {};

             self.getEntries = function(){
                userService.getEntries()
                    .then(function(response){
                     //   console.log(response.data);
                        self.entries = response.data.entries;
                    },function(err){
                        console.log(err);
                    })
            };


            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                }
            }

            self.date = moment().format('LL');

            self.addEntry = function(){
                var data = {
                    title:self.title,
                  entry:self.entry
                };
                userService.entry(data)
                    .then(function(response){
                    //    console.log(response);

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Entry added successfully!')
                                .position('top right')
                                .hideDelay(3000)
                        );
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

            self.deleteEntry = function(){
                var date = moment().format();
                var entryDate = $filter('date')(date,'yyyy-MM-dd');
//                console.log(entryDate);

                userService.deleteEntry(entryDate)
                    .then(function(res){
                        console.log(res);
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Entry deleted successfully!')
                                .position('top right')
                                .hideDelay(3000)
                        );
                    },function(err){
                        console.log(err);
                    })
            }


        }]);