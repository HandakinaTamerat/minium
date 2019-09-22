const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    body: String,
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    highFives: [
        {
            createdAt: {type: Date,default: Date.now},
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ]
})

module.exports = mongoose.model('posts', commentSchema, 'posts')