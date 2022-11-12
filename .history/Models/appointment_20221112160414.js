const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4")

const appointmentSchema = new mongoose.Schema({
  _id: {
    type: String,
        required: true,
    default:
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
