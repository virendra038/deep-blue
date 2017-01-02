'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var userModel = require('../models/userModel');
var async = require('async');
var validator = require('validator');
var async = require('async');
/**
* Attaches the user id to the request if authenticated
* Otherwise redirected to homepage with 200
*/
module.exports.isAuthenticated = function(req, res, next) {

  async.waterfall([
    function(callback){
      var auth =  req.headers.authorization;
      if(auth == null){
        return res.status(401).send('Unauthorized'); //res.redirect("http://localhost:7000");
      } else {
        var token = auth.split(" ")[1];
        callback(null, token);
      }
    },function(token){
      jwt.verify(token,config.secret, function(err,response){
        if(err){
          return res.status(401).send('Unauthorized'); //res.redirect("http://localhost:7000");
        } else {

          var decoded = jwt.decode(token);
          req.userId = decoded.id;
          return next();
        }
      });
    }
  ]);
};

