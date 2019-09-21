var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var indexRouter = require('./routes/api/auth');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', indexRouter);

app.listen(3000, _ => console.log('listening on port 3000'))

// connect to db
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0-h3xef.gcp.mongodb.net/minium?retryWrites=true&w=majority`
mongoose.connect(dbUrl, { useNewUrlParser: true }).
then(res => console.log('connected to db...')).
catch(error => handleError(error));

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

module.exports = app;
