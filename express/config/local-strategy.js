'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');

module.exports = function () {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function (username, password, done) {
      UserModel.findOne({
        username: username.toLowerCase()
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.authenticate(password)) {
          return done(null, false, {
            message:`Invalid username or password (${(new Date()).toLocaleTimeString()})`
          });
        }

        return done(null, user);
      });
    }
  ))
};
