const mongoose = require("mongoose")
const Schema = mongoose.Schema

const telegramChatSchema = new Schema({
  chatId: { type: String, required: true, unique: true },
  //owner: { type: ObjectId, ref: 'User', required: true },
  first_name: { type: String },
  last_name: { type: String },
  updated_at: Date,
  created_at: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model("TelegramChat", telegramChatSchema, "telegram_chat")
