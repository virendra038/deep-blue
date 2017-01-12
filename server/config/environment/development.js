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

    facebookClientID : '1753892821604803',

    facebookClientSecret : '17ec588367d10922dc8e3031d75aec5e',

    facebookCallbackURL:'http://localhost:9000/auth/facebook/callback',

    googleClientID:'811729034169-s8nl1felcqeptev4chu4h8el3or0hijk.apps.googleusercontent.com',

    googleClientSecret:'IeDdotiPXK13Ch1xEfJIAkSY',

    googleCallbackURL:'http://localhost:9000/auth/google/callback'


};