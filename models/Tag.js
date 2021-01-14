const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Tag', tagSchema, 'tags');
