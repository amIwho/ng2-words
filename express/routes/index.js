const passport = require('passport');

const basicRoutes = require('./texts_api');
const userRoutes = require('./users_api');

module.exports = function (app, db) {
    basicRoutes(app, db);

    userRoutes(app, db);

    app.get('/auth/google',
        passport.authenticate(
            'google-stragegy',
            {scope: ['https://www.googleapis.com/auth/plus.login']})
    );

    app.get('/oauth2callback',
        passport.authenticate(
            'google-strategy',
            {failureRedirect: '/login'}
        ),
        function (req, res) {
            res.redirect('/');
        });
};