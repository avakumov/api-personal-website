const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const questionSchema = new Schema({
  status: {type: String, enum: ["active", "archive"]},
  question: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
  rightCount: {type: Number, integer: true, default: 0},
  wrongCount: {type: Number, integer: true, default: 0},
  owner: { type: ObjectId, ref: "User", required: true },
  tags: [{ type: ObjectId, ref: "Tag", required: true }],
  updated_at: Date,
  created_at: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model("Question", questionSchema, "questions")
