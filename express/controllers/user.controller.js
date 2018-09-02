'use strict';

const passport = require('passport');
const validator = require('validator');

const UserModel = require('../models/user');
const errorHandler = require('./errors.controller');

exports.register = function (req, res) {
  const user = new UserModel(req.body);
  user.provider = 'local';

  user.save(function (err) {
    if (err) return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });

    user.password = void 0;
    user.salt = void 0;

    req.login(user, function (err) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(user);
      }
    });
  });
};
exports.signin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err || !user) {
      res.status(422).send(info);
    } else {
      user.password = void 0;
      user.salt = void 0;

      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

exports.signout = function (req, res) {
  req.logout();
  res.status(200).send('OK');
};

exports.me = function (req, res) {
  let safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created_at: req.user.created_at.toString(),
    };
  }
  res.json(safeUserObject || null);
};



