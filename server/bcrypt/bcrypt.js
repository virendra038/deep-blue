(function(){
  'use strict';
	var bcrypt = require('bcryptjs');
	var async = require('async');

	var generateHash = function(password, generatedHash){
	    
		      bcrypt.genSalt(10, function(err, salt){
		        bcrypt.hash(password, salt, function(err, hash){
		          return generatedHash(null, hash);
		        });

		      });
		         
	}; 

	var compare = function(password,storedPwd,comparedValue){
		bcrypt.compare(password,storedPwd, function(err, res){
					if(err){
						return comparedValue(err);
					}

					return comparedValue(null, res);
				});
	};

	var crypt = {};
	crypt.generateHash = generateHash;
	crypt.compare = compare;

	module.exports = crypt;


}());
