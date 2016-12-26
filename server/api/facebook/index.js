(function(){
    'use strict';

    var express = require('express');
    var config = require('../../config/environment');
    var controller = require('./facebookCtrl');
    var passport = require('passport');
    var router = express.Router();

    router.route('/facebook/callback')
        .get(passport.authenticate('facebook',{
            failure:'http://localhost:7000'
        }),controller.facebook);

    router.route('/facebook')
        .get(passport.authenticate('facebook', {
            scope:['email','public_profile']
        }));

    module.exports = router;


}());