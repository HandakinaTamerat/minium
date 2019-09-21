const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    description: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'users' }]
})

module.exports = mongoose.model('posts', postSchema, 'posts')