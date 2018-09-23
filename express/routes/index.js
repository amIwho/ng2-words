const basicRoutes = require('./texts_api');
const userRoutes = require('./users_api');

module.exports = function (app, db) {
    basicRoutes(app, db);
    userRoutes(app, db);

    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

};