(function(){
    'use strict';
    var path = require('path');
    var config = require('../../config/environment');
    var jwt = require('jsonwebtoken');
    var moment = require('moment');
    var generator = require('generate-password');
    var seq = require('../../config/dbconfig');
    var uuid = require('node-uuid');
    var userModel = require('../../models/userModel');

    module.exports.facebook = function (req, res, next) {

        var user = req.user;
       //  console.log(user.email);


        var newUser = {
            id: uuid.v4(),
            email: user.email,
            password:generator.generate({length:10,numbers:true}),
            firstname:user.firstname,
            lastname:user.lastname,
            created_at: moment().format("ll"),
            updated_at: moment().format('ll')

        };

        // console.log(newUser);

        userModel.findOne({

            where: {
                email: user.email
            }
        })
            .then(function (user) {

                if (user != null) {

                    var token = jwt.sign(
                        {
                            id:user.get('id')
                        }, seq.secret,{
                            expiresIn: 60 * 60 * 24 * 30 * 3
                        });


                    res.cookie('tokenSocial',token);

                    res.redirect(config.url);


                } else {
                    userModel.create(newUser)
                        .then(function(user){

                            var token = jwt.sign(
                                {
                                    id:newUser.id
                                }, seq.secret,{
                                    expiresIn: 60 * 60 * 24 * 30 * 3
                                });

                            res.cookie('tokenSocial',token);
                            res.redirect(config.url);

                            return null;
                        })
                        .catch(function (err) {
                            res.redirect('http://localhost:7000');
                        })
                }

                return null;
            })
            .catch(function (err) {

                res.redirect('http://localhost:7000');

            });

    };

}());