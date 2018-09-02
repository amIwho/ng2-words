const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('express/secrets');

passport.use('google-stragegy', new GoogleStrategy({
        clientID: config.auth.google.web.client_id,
        clientSecret: config.auth.google.web.client_secret,
        callbackURL: config.auth.google.web.redirect_uris
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, user);
    }
));