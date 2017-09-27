'use strict';

const passport = require('passport');
const UserModel = require('../models/user');


module.exports = function (app) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    UserModel.findOne({
      _id: id
    }, '-salt -password', function (err, user) {
      done(err, user);
    });
  });

  require('./local-strategy')();

  app.use(passport.initialize());
  app.use(passport.session());
};
