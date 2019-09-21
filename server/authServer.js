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


// connect to db
connectToDb();

app.use('/api', authRouter);

app.use(cors())


app.listen(4000, _ => console.log('listening on port 4000'))
