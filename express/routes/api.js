(function () {
  "use strict";
  const api = require('express').Router();
  const passport = require('passport');
  const UserController = require('../controllers/user.controller');

  api.get('/', isLoggedIn, function(req, res) {
    res.status(200).send({message: 'OK'});
  });

  api.post('/signup', UserController.signup);
  api.post('/signin', UserController.signin);

  api.get('/signout', UserController.signout);
  api.get('/me', UserController.me);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.status(401).send({message:'Not authenticated'});
  }

  module.exports = api;
}());

