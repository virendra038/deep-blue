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
    router.post('/profile',auth.isAuthenticated, controller.updateUser);
    router.get('/content',auth.isAuthenticated, controller.getContent);
    router.get('/content/:date',auth.isAuthenticated, controller.getEntryContent);
    router.get('/content/delete/:date',auth.isAuthenticated, controller.deleteEntry);
    router.post('/content',auth.isAuthenticated, controller.content);
    router.post('/content/update/:date',auth.isAuthenticated, controller.updateContent);
    router.post('/search',auth.isAuthenticated, controller.search);
    module.exports = router;


}());