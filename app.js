var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userDataRouter = require('./routes/userData');

var mongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// mongodb middleware
app.use(async (req, res, next) => {
  if(!!mongoClient) {
    req.db = mongoClient.db(config.databaseName);
  } else {
    mongoClient = await new MongoClient(config.databaseUrl).connect();
    req.db = mongoClient.db(config.databaseName);
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userData', userDataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;
