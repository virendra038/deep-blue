(function () {
    'use strict';

    var express = require('express');
    var config = require('../../config/environment');
    var controller = require('./profileCtrl');
    var router = express.Router();


    router.get('/profile', controller.profile);

    module.exports = router;


}());