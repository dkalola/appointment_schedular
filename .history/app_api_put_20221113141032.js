const express = require("express");

const Appointment = require("./Models/appointment");
const router = express.Router();

// PUT
// TODO
// - update user information
// - update sub dates
// - update status code
// - update appointment

router.put("/user/:id", function (req, res) {
  res.send("update user data");
});

router.put("/user/:id", function (req, res) {
  res.send("update sub data");
});

router.put("/user/:id", function (req, res) {
  res.send("update status code");
});

router.put("/appointment/:userId/:guestId", function (req, res) {
  res.send("update appointment");
});

function print(string) {
  console.log(string);
}

module.exports = router;
