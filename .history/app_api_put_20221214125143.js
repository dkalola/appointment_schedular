const express = require("express");

const Appointment = require("./Models/appointment");
const router = express.Router();

// PUT
// TODO
// - update user information
// - update sub dates
// - update status code
// - update appointment

// update user data
router.put("/appointment", function (req, res) {
  res.send("update user data");
});

// update sub data
router.put("/user/:id", function (req, res) {
  res.send("update sub data");
});

// update status code
router.put("/user/:id", function (req, res) {
  res.send("update status code");
});

// update appointment
router.put("/appointment/:userId/:guestId", function (req, res) {
  res.send("update appointment");
});

function print(string) {
  console.log(string);
}

module.exports = router;
