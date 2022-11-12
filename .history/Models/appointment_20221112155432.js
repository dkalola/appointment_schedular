const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  guestID: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  data: Buffer,
});
