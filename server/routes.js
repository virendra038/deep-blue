/**
 * routes.js - Main file for application routes
 */

'use strict';

var path = require('path');
var errors = require('./components/errors');

module.exports = function (app) {
    app.use('/api/v1', require('./api/profile'));
    app.use('/auth', require('./api/google'));
    app.use('/auth', require('./api/facebook'));

    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(function (req, res) {
            res.status(404);
            res.sendFile(path.resolve(app.get('views') + '/404.html'));
        });

    app.route('/*')
        .get(function (req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });


};