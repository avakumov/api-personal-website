const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const noteSchema = new Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: ObjectId, ref: 'User', required: true },
  tag: {type: ObjectId, ref: 'Tag', required: true },
  updated_at: Date,
  created_at: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('Note', noteSchema, 'notes');
