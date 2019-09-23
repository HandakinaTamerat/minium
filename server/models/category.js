const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {type: String, unique: true},
})

module.exports = mongoose.model('categories', categorySchema, 'categories')