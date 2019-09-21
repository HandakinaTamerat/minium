const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    first_name: String,
    last_name: String,
    username: String
})

module.exports = mongoose.model('auth', userSchema, 'users')