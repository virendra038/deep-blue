angular.module('deep-blue')
    .controller('HomeCtrl', ['$scope','userAuthenticationService','$state','$cookieStore','$rootScope',
        function ($scope, userAuthenticationService, $state, $cookieStore, $rootScope) {

            var self = this;

            self.login = function(){

                var data = {
                    email:self.userEmail,
                    password:self.password
                };
                userAuthenticationService.login(data)
                    .then(function(response){
                      //  console.log(response);
                        $cookieStore.put('auth-token', response.data.token);
                        $rootScope.isLoggedIn = true;
                        $state.go('diaryContent');
                    },function(err){
                        console.log(err);
                    })
            };


            self.signup = function(){

                var data = {
                    email:self.email,
                    password:self.password1
                };
                userAuthenticationService.signup(data)
                    .then(function(response){
                        $cookieStore.put('auth-token', response.data.token);
                        $rootScope.isLoggedIn = true;
                        $state.go('diaryContent');
                    },function(err){
                        console.log(err);
                    })
            }




        }]);