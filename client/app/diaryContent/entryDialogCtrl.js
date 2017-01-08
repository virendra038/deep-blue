/**
 * Created by viren on 6/1/17.
 */


"use strict";

angular.module('deep-blue')
    .controller('entryDialogCtrl', ['$scope','$timeout', '$mdSidenav','userService','$filter','$mdDialog','entryDate','$state',
        function ($scope, $timeout, $mdSidenav, userService, $filter, $mdDialog, entryDate, $state) {

            var self = this;

            //console.log(entryDate);
            self.entryText = '';
            self.entryDate = entryDate;

            userService.getEntry(entryDate)
                .then(function(response){
                    //console.log(response.data.entries);
                    self.entryText = response.data.entries[0].entry;
                    self.entryTitle = response.data.entries[0].title;
                    //console.log(self.entryText);
                },function(err){
                    console.log(err);
                });


            self.hide = function() {
                $mdDialog.hide();
            };

            self.cancel = function() {
                $mdDialog.cancel();
            };

            self.deleteEntry = function() {
                $mdDialog.hide();

                userService.deleteEntry(entryDate)
                    .then(function(res){
                        console.log(res);
                    },function(err){
                      console.log(err);
                    })
                $state.reload();
            }



        }]);