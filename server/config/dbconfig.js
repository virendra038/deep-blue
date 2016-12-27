(function(){
    'use strict';

    var Sequelize = require('sequelize');
    var config = require('./environment');

    var sequelize = new Sequelize(config.schema,config.username,config.password,{
        host: config.dbhost,
        dialect:'postgres',
        pool:{
            max:5,
            min:0,
            idle:10000
        }
    });

    sequelize
        .authenticate()
        .then(function(err) {
            console.log('Connection has been established successfully.');
        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });

     var post = {};

    post.Sequelize = Sequelize;
    post.sequelize = sequelize;
    post.secret    = config.secret;

    module.exports = post;
}());