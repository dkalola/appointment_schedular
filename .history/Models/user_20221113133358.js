const { Numbers } = require("@mui/icons-material");
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
  subPlan: { type: Number }, // 1 = Bronze, 2 = Silver, 3 = Platinum
  reqCountCurrent: { type: Number, default: 0 },
  reqCountMax: { type: Number, default: 0 },
  statusCode: { type: Number, required: true, default: -1 }, // 0, Haulted, -1 = Unsubscribed, 1 = Bronze, 2 = Silver, 3 = Platinum
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
