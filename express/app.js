const express = require('express');
const app = express();
const passport = require('passport');

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const PORT = 5005;
const config = require('./secrets.json');

const UserModel = require('./models/user');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use('google', new GoogleStrategy({
        clientID: config.auth.google.web.client_id,
        clientSecret: config.auth.google.web.client_secret,
        callbackURL: config.auth.google.web.redirect_uris[1]
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            // UserModel.findUserByGoogleId(profile.id)
            //     .then((user) => {
            //             if (user) return done(null, user);
            //
            //             UserModel.createUser({
            //                 username: profile.emails[0].value.split('@')[0],
            //                 firstName: profile.name.givenName,
            //                 lastName: profile.name.familyName,
            //                 email: profile.emails[0],
            //                 google: {
            //                     id: profile.id,
            //                     token: token,
            //                 }
            //             })
            //         },
            //         (err) => done(err))
            //     .then(
            //         (user) => done(null, user),
            //         (err) => done(err)
            //     );

            return done(null, profile);
        });


        // user.save(function (err) {
        //     if (err) return res.status(422).send({
        //         message: errorHandler.getErrorMessage(err)
        //     });
        //
        //     user.password = void 0;
        //     user.salt = void 0;
        //
        //     req.login(user, function (err) {
        //         if (err) {
        //             res.status(400).send(err);
        //         } else {
        //             res.json(user);
        //         }
        //     });
        // });
        // return done(null, user);
    }
));

app.use(express.static(require('path').join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'new horse fly sky',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

MongoClient.connect(
    `mongodb://${config.db.dbuser}:${config.db.dbpassword}@${config.db.dbhost}/${config.db.dbname}`,
    {useNewUrlParser: true},
    (err, database) => {
        if (err) return console.log(err);
        require('./routes')(app, database);
        app.listen(PORT, () => {
            console.log('We are live on http://localhost:' + PORT);
        });
    });


module.exports = app;
