const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: Mongoose.Types.ObjectId,
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
  data: Buffer,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
