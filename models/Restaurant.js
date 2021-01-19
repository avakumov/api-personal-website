const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const restaurantSchema = new Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: [ 'Point' ],
      required: true
    },
    coordinates: {
      type: [ Number ],
      required: true
    }
  },
  owner: { type: ObjectId, ref: 'User', required: true },
  available: {
    type: Boolean,
    required: true,
  },

  updated_at: Date,
});

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurants');
