const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectToDb = require('./db')

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/api/posts');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', postsRouter);

app.listen(3000, _ => console.log('listening on port 3000'))

// connect to db
connectToDb();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
