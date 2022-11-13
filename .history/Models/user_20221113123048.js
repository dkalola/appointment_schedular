const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
