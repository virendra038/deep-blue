/**
 * Created by viren on 13/1/17.
 */


"use strict";

angular.module('deep-blue')
    .controller('allEntriesCtrl', ['$scope','$timeout', '$mdSidenav','userService','$filter','$mdDialog','$state','$stateParams',
        function ($scope, $timeout, $mdSidenav, userService, $filter, $mdDialog, $state, $stateParams) {

            var self = this;
            //console.log($stateParams);

            var data = {
                search :$stateParams.search
            };

            userService.search(data)
                .then(function(res){
                    self.entries = res.data.entries;
                    //console.log(res);
                },function(err){
                    console.log(err);
                });

            self.detail =  function(date,ev){
              console.log(date);
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
