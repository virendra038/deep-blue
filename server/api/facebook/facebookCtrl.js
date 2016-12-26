(function(){
    'use strict';
    var path = require('path');
    var config = require('../../config/environment');
    var jwt = require('jsonwebtoken');
    var moment = require('moment');
    var generator = require('generate-password');
    var seq = require('../../config/dbconfig');
    var uuid = require('node-uuid');


    module.exports.facebook = function (req, res, next) {

        res.send("facebook");

    };

}());