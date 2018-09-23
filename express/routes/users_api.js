const passport = require("passport");
module.exports = function (app) {

    const UserController = require('../controllers/user.controller');

    app.get('/api/me', UserController.me);
    app.get('/api/register', UserController.register);
    app.get('/api/signin', UserController.signin);
    app.get('/api/signout', UserController.signout);

    app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/api/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/#/',
        failureRedirect: '/#/login'
    }));
};