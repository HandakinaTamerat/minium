const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectToDb = require('./db')
var cors = require('cors')


const indexRouter = require('./routes/index');
const postsRouter = require('./routes/api/posts');
const usersRouter = require('./routes/api/users');
const categoryRouter = require('./routes/api/category');

const app = express();

// connect to db
connectToDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoryRouter);

app.use(cors())


app.listen(3000, _ => console.log('listening on port 3000'))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;


/*
// kill node ports
// pkill -f node
// pkill -f nodejs
*/