import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
})

export default mongoose.model('User', UserSchema, 'users')
