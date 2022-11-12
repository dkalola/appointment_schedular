const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: {},
  guestID: {},
  date: {},
  time: {},
  epoch: {},
});
