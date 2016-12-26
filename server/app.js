/**
 * app.js - Server main application file
 *
 *
 * Changelog
 * 8th Jun 2016 - File creation
 */

'use strict';


// Include the cluster module
//var cluster = require('cluster');

// // Code to run if we're in the master process
// if (cluster.isMaster) {
//
//     // Count the machine's CPUs
//     var cpuCount = require('os').cpus().length;
//
//     // Create a worker for each CPU
//     for (var i = 0; i < cpuCount; i += 1) {
//         cluster.fork();
//     }
//
//     // Listen for dying workers
//     cluster.on('exit', function (worker) {
//         cluster.fork();
//     });
//
// // Code to run if we're in a worker process
// } else {

// Set default node environment to development
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    var express = require('express');
    var config = require('./config/environment');

// Setup express server
    var app = express();
    var server = require('http').createServer(app);

    require('./config/express')(app);
    require('./routes')(app);

    server.listen(config.port, config.ip, function () {
        //console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });


// Expose app
    exports = module.exports = app;
// }