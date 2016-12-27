(function(){
    'use strict';
    var db = require('../config/dbconfig');

    var user = db.sequelize.define("user", {
            id:{
                type:db.Sequelize.CHAR,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true,
                get:function(){
                    return this.getDataValue('id');
                }
            },
            firstname:{
                type:db.Sequelize.CHAR,
                allowNull:true,
                get:function(){
                    return this.getDataValue('firstname');
                },
                set: function(val){
                    this.setDataValue('firstname',val);
                }
            },
            lastname:{
                type:db.Sequelize.CHAR,
                allowNull:true,
                get:function(){
                    return this.getDataValue('lastname');
                },
                set: function(val){
                    this.setDataValue('lastname',val);
                }
            },
            email:{
                type:db.Sequelize.CHAR,
                allowNull: false,
                get:function(){
                    return this.getDataValue('email');
                },
                set: function(val){
                    this.setDataValue('email',val);
                }
            },
            password:{
                type:db.Sequelize.CHAR,
                allowNull: false,
                get:function(){
                    return this.getDataValue('password');
                },
                set: function(val){
                    this.setDataValue('password',val);
                }
            },
            temptoken:{
                type:db.Sequelize.STRING,
                allowNull: true,
                get:function(){
                    return this.getDataValue('temptoken');
                },
                set: function(val){
                    this.setDataValue('temptoken',val);
                }
            },
            socialtoken:{
                type:db.Sequelize.STRING,
                allowNull: true,
                get:function(){
                    return this.getDataValue('socialtoken');
                },
                set: function(val){
                    this.setDataValue('socialtoken',val);
                }
            },
            created_at:{
                type:db.Sequelize.DATEONLY,
                allowNull: false
            },
            updated_at:{
                type:db.Sequelize.DATEONLY,
                allowNull: false
            }
        },
        {
            tableName:'users',
            timestamps:false

        });

    module.exports = user;

}());