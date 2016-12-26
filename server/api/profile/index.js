(function () {
    'use strict';

    var express = require('express');
    var config = require('../../config/environment');
    var controller = require('./profileCtrl');
    var router = express.Router();


    router.post('/login', controller.login);

    module.exports = router;


}());