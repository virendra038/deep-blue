(function(){
    'use strict';

    var express = require('express');
    var config = require('../../config/environment');
    var controller = require('./googleCtrl');
    var passport = require('passport');
    var router = express.Router();

    router.route('/google/callback')
        .get(passport.authenticate('google',{
            failureRedirect:'http://localhost:7000'
        }),controller.google);

    router.route('/google')
        .get(passport.authenticate('google', {
            scope:['https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email']
        }));

    module.exports = router;


}());