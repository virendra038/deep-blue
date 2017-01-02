/**
 */

'use strict';

angular.module('deep-blue')
    .factory('userService',[ '$http', '$q', 'deepBlueConstant','$cookieStore',
        function userActionService(  $http, $q, deepBlueConstant, $cookieStore) {


            var currentUser = {};

            return {
                /* allow user to login */

                profile: function(data, callback) {
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'GET',
                        url     : deepBlueConstant.baseUrl + 'profile'
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

                /* allow user to login */

                entry: function(data, callback) {
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'POST',
                        url     : deepBlueConstant.baseUrl + 'content',
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
                }
            };
        }]);