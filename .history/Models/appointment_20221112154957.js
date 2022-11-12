const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: {
    type: "String",
  },
  guestID: {},
  date: {},
  time: {},
  epoch: {},
  data: {},
});
