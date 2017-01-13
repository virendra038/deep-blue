angular.module('deep-blue')
    .controller('HomeCtrl', ['$scope','userAuthenticationService','$state','$cookieStore','$rootScope','$window',
        function ($scope, userAuthenticationService, $state, $cookieStore, $rootScope, $window) {

            var self = this;

            self.isLoggedIn = userAuthenticationService.isLoggedIn();
            console.log(self.isLoggedIn);

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
            };

            self.google = function(){
               // console.log('google');
                    $window.location.href = 'auth/google';
            };

            self.facebook = function(){
                // console.log('google');
                $window.location.href = 'auth/facebook';
            };




        }]);