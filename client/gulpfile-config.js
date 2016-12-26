(function () {
    'use strict';

    module.exports = {

        alljs: ['app/app.js',
            'app/account/**/*.js',
            'app/**/*.js',
            'assets/directives/*.js'],

        scss: ['assets/scss/base.scss'],

        allscss: ['app/**/*.scss',
            'assets/scss/*.scss'],

        index: './index.html',

        allhtml: ['index.html',
            'app/**/*.html'],

        htmltemplates: './app/**/*.html',
        templateCache : {
            file : 'templates.js',
            options : {
                module : 'qcn',
                standAlone : false,
                root : 'app/'
            }
        },
        temp : './tmp/',
        build : './build/',

        allServerjs: ['../server/*.js',
            '../server/api/**/*.js',
            '../server/config/**/*.js',
            '..server/config/*.js'],

        getWiredepDefaultOptions: function () {
            var options = {
                bowerJson: require('./bower.json'),
                directory: './bower_components',
                cwd: './client',
                relative: true
            };
            return options;
        }


    };


}());