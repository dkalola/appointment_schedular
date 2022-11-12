const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  guestID: {
    type: String,
  },
  date: {
    type: Date,
  },
  time: {},
  epoch: {},
  data: {},
});
