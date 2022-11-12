const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    require,
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
