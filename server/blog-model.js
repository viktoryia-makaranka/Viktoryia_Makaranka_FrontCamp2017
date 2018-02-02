const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    _id: { type: String, auto: true },
    title: String,
    author: String,
    body: String
});

module.exports = mongoose.model('Blog', blogSchema, 'blogs');