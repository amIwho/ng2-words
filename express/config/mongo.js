const Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
const secrets = require('../secrets.json');
const mongoURI = `mongodb://${secrets.dbuser}:${secrets.dbpassword}@localhost/wordly`;


//todo: implement reconnection on mongo restart case
Mongoose.connect(mongoURI, {
  useMongoClient: true
}).then(
  () => {
    console.log("Connection with database succeeded.");
  },
  (err) => {
    console.error('connection error:', err);
  }
);

const db = Mongoose.connection;

exports.db = db;
