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
    router.get('/profile',auth.isAuthenticated, controller.getUser);
    router.get('/content',auth.isAuthenticated, controller.getContent);
    router.post('/content',auth.isAuthenticated, controller.content);
    module.exports = router;


}());