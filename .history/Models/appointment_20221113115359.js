const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  },
  guestID: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
