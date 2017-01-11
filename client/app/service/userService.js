/**
 */

'use strict';

angular.module('deep-blue')
    .factory('userService',[ '$http', '$q', 'deepBlueConstant','$cookieStore',
        function userActionService(  $http, $q, deepBlueConstant, $cookieStore) {


            var currentUser = {};

            return {
                /* allow user to fetch profile info*/

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

                /* allow user to update profile info*/

                updateProfile: function(data, callback) {
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'POST',
                        url     : deepBlueConstant.baseUrl + 'profile',
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

                /* allow user to add entry */

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
                },

                /* allow user to update entry */

                updateEntry: function(date, data, callback) {
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'POST',
                        url     : deepBlueConstant.baseUrl + 'content/update/'+date,
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


                /* allow user to get all entries */

                getEntries: function( callback) {
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'GET',
                        url     : deepBlueConstant.baseUrl + 'content'
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
                getEntry: function( data,callback) {
                    // console.log(data);
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'GET',
                        url     : deepBlueConstant.baseUrl + 'content/'+data,
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
                /* delete an entry */
                deleteEntry: function( data,callback) {
                    // console.log(data);
                    var cb = callback || angular.noop;
                    var deferred = $q.defer();

                    $http({
                        method  : 'GET',
                        url     : deepBlueConstant.baseUrl + 'content/delete/'+data
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