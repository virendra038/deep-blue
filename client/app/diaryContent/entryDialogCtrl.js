/**
 * Created by viren on 6/1/17.
 */


"use strict";

angular.module('deep-blue')
    .controller('entryDialogCtrl', ['$scope','$timeout', '$mdSidenav','userService','$filter','$mdDialog','entryDate',
        function ($scope, $timeout, $mdSidenav, userService, $filter, $mdDialog,entryDate) {

            var self = this;

            //console.log(entryDate);
            self.entryText = '';
            self.entryDate = entryDate;

            userService.getEntry(entryDate)
                .then(function(response){
                    console.log(response.data.entries);
                    self.entryText = response.data.entries[0].entry;
                    console.log(self.entryText);
                },function(err){
                    console.log(err);
                });


            self.hide = function() {
                $mdDialog.hide();
            };

            self.cancel = function() {
                $mdDialog.cancel();
            };



        }]);