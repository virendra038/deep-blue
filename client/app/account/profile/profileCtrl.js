angular.module('deep-blue')
    .controller('profileCtrl', ['$scope','userService','$cookieStore','$rootScope',
        function ($scope, userService, $cookieStore, $rootScope) {

            var self = this;
            userService.profile()
                .then(function(response){

                    var profile = response.data.user;
                  //  console.log(profile);

                    self.userEmail = profile.email;


                },function(err){
                    console.log(err);
                })




        }]);