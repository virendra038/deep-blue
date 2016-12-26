'use strict';

var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../environment');

module.exports = function(){

    passport.use(new GoogleStrategy({
            clientID:config.googleClientID,
            clientSecret:config.googleClientSecret,
            callbackURL:config.googleCallbackURL,
            passReqToCallback:true},
        function(req, accessToken, refreshToken, profile, done){

            // console.log(req.session.redirectBackTo,'lllllllllllllllllllllllllllllll');
            var user = {};
            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            //   console.log('profile',user);

            done(null, user);
        }));



};