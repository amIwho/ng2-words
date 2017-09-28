const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const helmet = require('helmet');

const db = require('./config/mongo');
const api = require('./routes/api');

const app = express();

// app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({
  secret: 'new horse fly sky',
  saveUninitialized: true,
  resave: false
}));

app.use(express.static(path.join(__dirname, 'dist')));

require('./config/passport')(app);

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found ' + req.path);
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(res.locals);
});

module.exports = app;
