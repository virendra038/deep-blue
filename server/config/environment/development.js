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

    url: 'http://localhost:7000/',

    //Database parameters

    dbhost: '139.59.5.184',

    schema: 'deep-blue-dev',

    username: 'deep-blue',

    password: 'testing',

    secret: 'ofthechambers',

    facebookClientID : '1673168503008112',

    facebookClientSecret : '3b4e221771a2f4b24255860917afd04b',

    facebookCallbackURL:'http://localhost:9000/auth/facebook/callback',

    googleClientID:'1081746878707-jgt8suetc9s46vct51ciq8sen87t921a.apps.googleusercontent.com',

    googleClientSecret:'CjARjlCk3MFY7USkGHlQkvNS',

    googleCallbackURL:'http://localhost:9000/auth/google/callback',


};