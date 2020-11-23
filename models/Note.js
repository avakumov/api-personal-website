const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const validator = require('validator')


const noteSchema = new Schema({
  _id: ObjectId,
  name: { type: String, required: true },
  //owner: { type: ObjectId, ref: 'User', required: true },
  updated_at: Date,
  created_at: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model('Note', noteSchema, 'notes');
