const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const db = require('./secrets.json').db;
const app = express();
const PORT = 5005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'new horse fly sky',
    saveUninitialized: true,
    resave: true
}));
app.use(express.static(require('path').join(__dirname, 'dist')));

// Passport init
app.use(passport.initialize({}));
app.use(passport.session({}));

MongoClient.connect(
    `mongodb://${db.dbuser}:${db.dbpassword}@${db.dbhost}/${db.dbname}`,
    {useNewUrlParser: true},
    (err, database) => {
        if (err) return console.log(err);
        require('./routes')(app, database);
        app.listen(PORT, () => {
            console.log('We are live on http://localhost:' + PORT);
        });
    });


module.exports = app;
