const Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
const secrets = require('../secrets.json');
const mongoURI = `mongodb://${secrets.dbuser}:${secrets.dbpassword}@localhost/wordly`;

Mongoose.connect(mongoURI, {
  useMongoClient: true
}).then(
  () => {console.log("Connection with database succeeded.");},
  (err) => {console.error.bind(console, 'connection error');}
);

const db = Mongoose.connection;

exports.db = db;
