'use strict';

var path = require('path');
var _ = require('lodash');

// Development specific configuration
// ==================================
module.exports = {
// Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    //Application url

    url: 'http://localhost:7000/memory',

    //Database parameters

    dbhost: 'localhost',

    schema: 'deepblue',

    username: 'deepblueuser',

    password: 'deepblue',

    secret: 'deepblue',

    facebookClientID : '1673168503008112',

    facebookClientSecret : '3b4e221771a2f4b24255860917afd04b',

    facebookCallbackURL:'http://localhost:9000/auth/facebook/callback',

    googleClientID:'811729034169-s8nl1felcqeptev4chu4h8el3or0hijk.apps.googleusercontent.com',

    googleClientSecret:'IeDdotiPXK13Ch1xEfJIAkSY',

    googleCallbackURL:'http://localhost:9000/auth/google/callback'


};