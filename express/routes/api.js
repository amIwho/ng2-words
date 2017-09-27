(function () {
  "use strict";
  const api = require('express').Router();

  const UserController = require('../controllers/user.controller');

  api.get('/', (req, res) => {
    res.send('api works');
  });

  api.post('/signup', UserController.signup);
  api.post('/signin', UserController.signin);
  api.post('/signout', UserController.signout);

  module.exports = api;
}());

