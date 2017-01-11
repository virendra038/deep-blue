"use strict";

angular.module('deep-blue')
    .controller('diaryContentCtrl', ['$scope','$timeout', '$mdSidenav','userService','$filter','$mdDialog','$mdToast','$state',
        function ($scope, $timeout, $mdSidenav, userService, $filter, $mdDialog, $mdToast, $state) {

            var self = this;

            self.toggleLeft = buildToggler('left');
            self.toggleRight = buildToggler('right');
            self.entry = '';
            self.title = '';
            self.entries = {};
            self.tags = [];
            self.readonly = false;

            var todayEntryExist = false;

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
		

		 var getTodayEntry = function(){

		     var today = new Date();
                var entryDate = $filter('date')(today,'yyyy-MM-dd');

             userService.getEntry(entryDate)
                 .then(function(response){
                //     console.log(response);
                     if(response.data.entries.length > 0)
                     {
                         self.entry = response.data.entries[0].entry;
                         self.title = response.data.entries[0].title;
                         todayEntryExist = true;
                     }
                     //console.log(self.entryText);
                 },function(err){
                     console.log(err);
                 });


            };

		 getTodayEntry();


            self.addEntry = function(){
                var data = {
                    title:self.title,
                  entry:self.entry
                };

                if(todayEntryExist){

                    var today = new Date();
                    var date = $filter('date')(today,'yyyy-MM-dd');

                    userService.updateEntry(date,data)
                        .then(function(response){
                            console.log(response);
                        },function(err){
                            console.log(err);
                        })

                } else {
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
                }

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
                      //  console.log(res);
                        $state.reload();
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
