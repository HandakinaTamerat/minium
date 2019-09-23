const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    first_name: String,
    last_name: String,
    username: String,
    followers: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'users' 
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'users' 
        }
    ]
})

module.exports = mongoose.model('users', userSchema)