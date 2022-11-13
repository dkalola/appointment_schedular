const mongoose = require("mongoose");

const apiKey = new mongoose.Schema({
  key: { type: String },
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  },
  apiKeys: [apiKey],
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
