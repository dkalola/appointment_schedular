const mongoose = require("mongoose");

const apiKey = new mongoose.Schema({
  key: { type: String },
  date: { type: Date, default: Date.now },
});

const appointmentDF = new mongoose.Schema({});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  },
  apiKeys: [apiKey],
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  subStartDate: {
    type: Date,
  },
  subEndDate: {
    type: Date,
    },
    appointmentDF = appointmentDF,
});

module.exports = mongoose.model("User", userSchema);
