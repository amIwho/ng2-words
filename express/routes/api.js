(function () {
  "use strict";
  const api = require('express').Router();
  const passport = require('passport');
  const TextController = require('../controllers/text.controller');
  const UserController = require('../controllers/user.controller');

  api.get('/', isLoggedIn, function(req, res) {
    res.status(200).send({message: 'OK'});
  });

  api.post('/signup', UserController.signup);
  api.post('/signin', UserController.signin);

  api.get('/signout', UserController.signout);
  api.get('/me', UserController.me);



  api.get('/timeline/:month', isLoggedIn, TextController.timeline);
  api.post('/texts', isLoggedIn, TextController.create);
  api.get('/text/:date', isLoggedIn, TextController.read);


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.status(401).send({message:'Not authenticated'});
  }

  module.exports = api;
}());

