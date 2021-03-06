/**
 */

'use strict';

angular.module('deep-blue')
    .factory('userAuthenticationService',[ '$http', '$q', 'deepBlueConstant','$cookieStore','$cookies','$rootScope',
        function userAuthenticationService(  $http, $q, deepBlueConstant, $cookieStore, $cookies, $rootScope) {


            var currentUser = {};

            return {
                /* allow user to login */

                login: function(data, callback) {
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'POST',
                        url     : deepBlueConstant.baseUrl + 'login',
                        data    : data
                    }).
                    then(function(data) {
                        deferred.resolve(data);
                        return cb();
                    }).
                    catch(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));
                    return deferred.promise;
                },

                /* allow user to signup */


                signup: function(data, callback) {
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'POST',
                        url     : deepBlueConstant.baseUrl + 'signup',
                        data    : data
                    }).
                    then(function(response) {
                        deferred.resolve(response);
                        return cb();
                    }).
                    catch(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));
                    return deferred.promise;
                },

                isLoggedIn: function () {
                    if ($cookieStore.get('auth-token')) {
                        return true;
                    }

                },

                logout: function (logData) {

                            $cookieStore.remove('auth-token');
                            $cookies.remove('tokenSocial');
                            currentUser = {};
                            $rootScope.isLoggedIn = false;
                            console.log('see ya !!')
                }
            };
        }]);