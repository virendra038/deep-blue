/**
 * Express configuration
 */

'use strict';

var express = require('express');
var passport = require('passport');
var favicon = require('serve-favicon');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var config = require('./environment');
//var session = require('express-session');
var dbconfig = require('./dbconfig');
var helmet = require('helmet');

module.exports = function (app) {
    var env = app.get('env');
    app.set('views', config.root + '/server/views');
    app.set('view engine', 'html');
    app.set('superSecret', dbconfig.secret);
    require('./passport')(app);
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(favicon(__dirname + '/../../client/favicon.ico'));
    /* app.use(function (req, res, next) {
     if (req.url.match(/^(.*\.(?!(htm|html|class)$))?[^.]*$/i)) {
     res.setHeader('Cache-Control', 'public, max-age=3600000');
     }
     next();
     });*/

    if ('test' === env || 'production' === env) {
        app.use(express["static"](__dirname + '/../../client/assets/', {maxAge: 360000000}));
    }

    //app.use(session({secret: 'veeru_038'}));

    if ('development' === env || 'test' === env || 'production' === env) {
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'client')));
        app.set('appPath', path.join(config.root, 'client'));
    }
};