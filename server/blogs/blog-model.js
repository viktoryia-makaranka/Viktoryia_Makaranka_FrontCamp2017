import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
});

export default mongoose.model('Blog', blogSchema, 'blogs');
