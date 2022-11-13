const mongoose = require("mongoose");

const apiKey = new mongoose.Schema({
  key: { type: String },
  date: { type: Date, default: Date.now },
});

const dateTimeRange = new mongoose.Schema({
  date: { type: Date },
});

const appointmentDF = new mongoose.Schema({
  slotSize: { type: Number },
  dateTimeRange: dateTimeRange,
});

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
  appointmentDF: appointmentDF,
});

module.exports = mongoose.model("User", userSchema);
