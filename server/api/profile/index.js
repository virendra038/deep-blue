(function () {
    'use strict';

    var express = require('express');
    var config = require('../../config/environment');
    var controller = require('./profileCtrl');
    var auth = require("../../auth/auth.service.js");
    var router = express.Router();


    router.post('/signup', controller.signup);
    router.post('/login', controller.login);
    router.post('/checkemail', controller.emailExist);
    router.get('/profile', controller.getUser);
    module.exports = router;


}());