(function(){
    'use strict';
    var path = require('path');
    var moment = require('moment');
    var config = require('../../config/environment');
    var userModel = require('../../models/userModel');
    var crypt = require('../../bcrypt/bcrypt');
    var async = require('async');
    var uuid = require('node-uuid');
    var jwt = require('jsonwebtoken');
    var seq = require('../../config/dbconfig');
    var validator = require('validator');
    var generator = require('generate-password');

    module.exports.profile = function (req, res, next) {

        res.send("profile");

    };

    module.exports.content = function (req, res, next) {

        var requestBody = req.body;
        var email = '';
        try {
            if(req.userId == '' || req.userId == undefined || req.userId == 'undefined' || req.userId == null)
            {
                throw {
                    status:400,
                    code:'bad.request',
                    message:"userId missing"
                };
            }

            var user_id = req.userId;
            var entry = req.body.entry;
            var created_at = moment().format('LLL');
            var updated_at = moment().format('LLL');
            var sqlQuery = "INSERT INTO entries(user_id,entry,created_at,updated_at) " +
                "VALUES(:user_id,:entry,:created_at,:updated_at)";

            seq.sequelize.query(sqlQuery,{
                replacements: {user_id:user_id,entry:entry,created_at:created_at,updated_at:updated_at},
                type: seq.sequelize.QueryTypes.INSERT
            })
                .then(function (result) {
                    res.sendStatus(201);
                })
                .catch(function (err) {
                    res.status(422).json({
                        error: {
                            msg:err.message,
                            code: "unexpected.error",
                            message: "please contact the administrator"
                        }
                    });

                })

        } catch (err) {
            res.status(422).json({
                error: {
                    code: "generic.exception",
                    message: err.message
                }
            });
        }

    };

    module.exports.getContent = function (req, res, next) {

        var requestBody = req.body;
        var email = '';
        try {
            if(req.userId == '' || req.userId == undefined || req.userId == 'undefined' || req.userId == null)
            {
                throw {
                    status:400,
                    code:'bad.request',
                    message:"userId missing"
                };
            }

            var user_id = req.userId;
            var entry = req.body.entry;
            var created_at = moment().format('LLL');
            var updated_at = moment().format('LLL');
            var sqlQuery = "SELECT * FROM  entries WHERE user_id = :user_id";

            seq.sequelize.query(sqlQuery,{
                replacements: {user_id:user_id,entry:entry,created_at:created_at,updated_at:updated_at},
                type: seq.sequelize.QueryTypes.INSERT
            })
                .then(function (result) {
                    res.sendStatus(201);
                })
                .catch(function (err) {
                    res.status(422).json({
                        error: {
                            msg:err.message,
                            code: "unexpected.error",
                            message: "please contact the administrator"
                        }
                    });

                })

        } catch (err) {
            res.status(422).json({
                error: {
                    code: "generic.exception",
                    message: err.message
                }
            });
        }

    };

    module.exports.signup = function (req, response, next) {

        try{

            if( req.body.email == "undefined" ||  req.body.email == undefined ||  req.body.email == '' ||  req.body.email == null)
            {
                throw {
                    status:400,
                    code:'bad.request',
                    message:"invalid attributes"
                };
            }

            if(!validator.isEmail(req.body.email)){
                throw {
                    status:400,
                    code:"bad.request",
                    message:'invalid email address'
                };
            }

            var tokenVal = jwt.sign({deep: 'blue'}, 'deepblue', {
                expiresIn: 60 * 60 * 24 * 3
            });

            var newUser = {
                id: uuid.v4(),
                email: req.body.email,
                created_at: moment().format("ll"),
                updated_at: moment().format('ll')

            };

            async.waterfall([

                function (callback) {
                    var validEmail = validator.isEmail(newUser.email);
                    var validPassword = validator.isLength(req.body.password, {min: 6, max: 30});
                    if (req.body.phone != null && req.body.phone != '' && req.body.phone != undefined) {
                        var validPhone = validator.isLength(req.body.phone, {
                                min: 4,
                                max: 15
                            }) && validator.isNumeric(req.body.phone);
                        var credentialsValid = validEmail && validPhone && validPassword;
                        callback(null, credentialsValid, validEmail, validPassword);
                    } else {
                        var credentialsValid = validEmail && validPassword;
                        callback(null, credentialsValid, validEmail, validPassword);
                    }
                },
                function (credentialsValid, validEmail, validPassword, callback) {
                    if (credentialsValid) {
                        callback(null);
                    } else {
                        if (!validEmail) {
                            response.status(422).json({
                                error: {
                                    code: "unprocessable.entity",
                                    message: "Enter a valid email address"
                                }
                            });
                        } else if (!validPassword) {
                            response.status(422).json({
                                error: {
                                    code: "unprocessable.entity",
                                    message: "Password is either too short or too long"
                                }
                            });
                        } else {
                            response.status(422).json({
                                error: {
                                    code: "unprocessable.entity",
                                    message: "Enter a valid Phonenumber"
                                }
                            });
                        }
                    }
                },
                function (callback) {

                    userModel.findOne({

                        where: {
                            email: req.body.email
                        }
                    })
                        .then(function (user) {
                            if (user != null) {
                                response.status(409).json({
                                    error: {
                                        code: "user.exists",
                                        message: "User already exists. Please login to access account."
                                    }
                                });

                            } else {
                                callback(null, true);
                            }
                        })
                        .catch(function (err) {
                            response.status(422).json({
                                error: {
                                    msg:err.message,
                                    code: "unexpected.error",
                                    message: "please contact the administrator"
                                }
                            });
                        });
                },
                function (proceed, callback) {

                    crypt.generateHash(req.body.password, function returnedHash(err, pwd) {
                        if (err) {
                            throw Error(err);
                        }
                        newUser.password = pwd;
                        callback(null, pwd);
                    });

                },
                function (pwd) {
                    userModel.create(newUser)
                        .then(function (user) {

                            var token = jwt.sign(
                                {
                                    id: newUser.id
                                },
                                seq.secret);
                            response.status(201).json({
                                message: 'Successfully Registered',
                                token: token
                            });

                        })
                        .catch(function (err) {

                            response.status(422).json({
                                error: {
                                    code: "unexpected.error",
                                    message: "please contact the administrator"
                                }
                            });
                        })
                }
            ]);
        } catch (err){
            response.status(err.status).json({
                error: {
                    code: err.code,
                    message: err.message
                }
            });
        }
    };


    module.exports.login = function (req, res, next) {

        try{
            if( req.body.email == "undefined" ||  req.body.email == undefined ||  req.body.email == '' ||  req.body.email == null)
            {
                throw {
                    status:400,
                    code:'bad.request',
                    message:"invalid attributes"
                };
            }

            if(!validator.isEmail(req.body.email)){
                throw {
                    status:400,
                    code:"bad.request",
                    message:'invalid email address'
                };
            }

            var email = req.body.email;
            var password = req.body.password;
            var pwdCheck = false;
            var storedPwd;


            async.waterfall([

                function (callback) {
                    if (validator.isEmail(email)) {
                        callback(null);
                    } else {
                        res.status(422).json({
                            error: {
                                code: "Unprocessable Entity",
                                message: "Enter a valid email address"
                            }
                        });
                    }
                },
                function (callback) {

                    userModel.findOne({

                        where: {
                            email: req.body.email
                        }
                    })
                        .then(function (user) {

                            if (user != null) {
                                storedPwd = user.get('password');

                                var payload = {
                                    id: user.get('id')
                                };

                                callback(null, storedPwd, payload);
                            } else {
                                res.status(404).json({
                                    error: {
                                        code: "unrecognized",
                                        message: "user is not registered"
                                    }
                                });
                            }
                        })
                        .catch(function (err) {
                            var data = {
                                request:JSON.stringify(req.body),
                                response:'422',
                                error_code:'generic.error',
                                error_message:err.message,
                                created_at: moment().format(),
                                error_source:'method='+req.method+'&url='+req.originalUrl
                            };

                            res.status(422).json({
                                error: {
                                    code: "unexpected.error",
                                    message: "please contact the administrator"
                                }
                            });

                            util.error_log(data);
                        });
                },

                function (storedPwd, payload, callback) {

                    crypt.compare(req.body.password, storedPwd, function (err, res) {
                        if (err) {
                            throw Error(err);
                        }
                        callback(null, res, payload);
                    });
                },

                function (pwdCheck, payload) {
                    if (pwdCheck == true) {
                        var token = jwt.sign(payload, seq.secret, {
                            expiresIn: 60 * 60 * 24 * 30 * 3
                        });
                        res.json({
                            status: 200,
                            success: true,
                            message: 'Successfully signed in',
                            token: token
                        });
                        //res.cookie('auth-token',token, { maxAge: 7776000, httpOnly: true });
                    } else {
                        res.status(404).json({
                            error: {
                                code: "invalid credentials",
                                message: "Invalid email address or password"
                            }
                        });
                    }
                }

            ]);
        } catch(err){
            res.status(err.status).json({
                error: {
                    code: err.code,
                    message: err.message
                }
            });
        }
    };


    module.exports.emailExist = function (req, res, next) {

        var requestBody = req.body;
        var email = '';
        try {
            if (!(typeof requestBody.email == 'undefined' || requestBody.email == "undefined" || requestBody.email == '')) {
                email = requestBody.email;
                if (!validator.isEmail(email)) {
                    throw "invalid email"
                }
            } else {
                throw "invalid attribute"
            }
            userModel.findOne({

                where: {
                    email: email
                }
            })
            .then(function (result) {
                if (result) {
                    res.sendStatus(200);
                } else {
                    res.status(422).json({
                        error: {
                            code: "user.does.not.exist",
                            message: "User does not exist"
                        }
                    });
                }
            }).catch(function (err) {
                res.status(422).json({
                    error: {
                        code: "generic.exception",
                        message: "An unexpected error has occurred. Please contact administrator"
                    }
                });
            });


        } catch (err) {
            res.status(422).json({
                error: {
                    code: "generic.exception",
                    message: err.message
                }
            });
        }

    };

    module.exports.getUser = function (req, res, next) {

        try{

            if(req.userId == '' || req.userId == undefined || req.userId == 'undefined' || req.userId == null)
            {
                throw {
                    status:400,
                    code:'bad.request',
                    message:"userId missing"
                };
            }


            userModel.findOne({

                where: {
                    id: req.userId
                }
            })
                .then(function (user) {
                    if (user != null) {
                        res.status(200).json({
                            user: {
                                firstname: user.get('firstname'),
                                lastname:user.get('lastname'),
                                email: user.get('email')
                            }
                        });

                    } else {
                        res.status(404).json({
                            error: {
                                code: "unrecognized",
                                message: "unrecognized"
                            }
                        });
                    }
                })
                .catch(function(err){

                    res.status(422).json({
                        error: {
                            code: "unexpected.error",
                            message: "please contact the administrator"
                        }
                    });
                })

        } catch (err){
            res.status(err.status).json({
                error: {
                    code: err.code,
                    message: err.message
                }
            });
        }

    };



}());