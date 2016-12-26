'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    //Application url
    url: 'http://139.59.2.49:9000/',

    util : 'http://139.59.5.184/',


    //Database parameters
    dbhost: '139.59.5.184',

    schema: 'qcn-b2c',

    username: 'qcn',

    password: 'testing',

    secret: 'hs31nYflOVVgPKM41pu6hPTwm0yxTxcz',

    //Email configuration

    email_from: 'virendrapratap038@gmail.com'

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {});