const authRouter = require('./routes/api/auth');
const express = require('express');
const connectToDb = require('./db')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

// connect to db
connectToDb();

app.use('/api', authRouter);




app.listen(3001, _ => console.log('listening on port 3001'))
