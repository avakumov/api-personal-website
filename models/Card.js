const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const cardSchema = new Schema({
  bgFront: { type: String },
  bgBack: { type: String },
  colorFront: { type: String },
  colorBack: { type: String },
  owner: { type: ObjectId, ref: "User", required: true },
  updated_at: Date,
  created_at: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model("Card", cardSchema, "cards")
