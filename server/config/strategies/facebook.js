var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../environment');

module.exports = function(){
    passport.use(new FacebookStrategy({
        clientID:config.facebookClientID,
        clientSecret:config.facebookClientSecret,
        callbackURL:config.facebookCallbackURL,
        passReqToCallback:true,
        profileFields: ['id', 'emails', 'name']
    },function(req, accessToken, refreshToken, profile, done){

        var user = {};
        //console.log(profile);
        user.email = profile.emails[0].value;
        //user.displayName = '';

        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;
        user.firstname = profile.name.givenName;
        user.lastname = profile.name.familyName;

        done(null, user);
    }));
};