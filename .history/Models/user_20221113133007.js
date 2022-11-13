const mongoose = require("mongoose");

const apiKey = new mongoose.Schema({
  key: { type: String },
  date: { type: Date, default: Date.now },
});

const dateTimeRange = new mongoose.Schema({
  timeStart: { type: Date },
  timeEnd: { type: Date },
});

const appointmentDF = new mongoose.Schema({
  slotSize: { type: Number },
  dateTimeRange: [dateTimeRange],
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
  subPlan: { type: Number, required: true }, // 1 = Bronze, 2 = Silver, 3 = Platinum
  reqCountMax: { type: Number, required: true },
  subStartDate: {
    type: Date,
    default: undefined,
  },
  subEndDate: {
    type: Date,
    default: undefined,
  },
  appointmentDF: appointmentDF,
});

module.exports = mongoose.model("User", userSchema);
