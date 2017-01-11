angular.module('deep-blue')
    .controller('profileCtrl', ['$scope','userService','$cookieStore','$rootScope',
        function ($scope, userService, $cookieStore, $rootScope) {

            var self = this;
            self.firstname = '';
            self.lastname = '';
            userService.profile()
                .then(function(response){

                    var profile = response.data.user;
                    console.log(profile);
                    if(profile.firstname != null){
                        self.firstname = profile.firstname;
                    }
                    if(profile.lastname != null){
                        self.lastname = profile.lastname;
                    }
                    self.userEmail = profile.email;


                },function(err){
                    console.log(err);
                });


            self.updateProfile = function(){
                var data = {
                    firstname : self.firstname,
                    lastname : self.lastname
                };

                userService.updateProfile(data)
                    .then(function(res){
                        console.log(res);
                },function(err){
                    console.log(err);
                    })
            }

        }]);