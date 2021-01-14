const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const validator = require('validator')


const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [ validator.isEmail, 'invalid email' ]
  },
  provider_user_id: {
    type: String,
    required: true,
    unique: true
  },
  provider: {
    type: String,
    enum: ['google'],
    required: true
  },
  type: {
    type: String,
    enum: ['soldier', 'admin'],
    required: true
  },
  //password: { type: String, required: true, select: false },

  updated_at: Date,
});

module.exports = mongoose.model('User', userSchema, 'users');
