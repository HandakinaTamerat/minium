const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    description: String,
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    comments: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'comments'
        }
    ],
    category: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'categories' 
        }
    ],
    highFives: [
        {
            createdAt: {type: Date,default: Date.now},
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('posts', postSchema)