const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const postSchema = new Schema({
  _id: ObjectId,
  title: { type: String, required: true },
  content: { type: String, required: true },
  //owner: { type: ObjectId, ref: 'User', required: true },
  updated_at: Date,
  created_at: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('Post', postSchema, 'posts');
