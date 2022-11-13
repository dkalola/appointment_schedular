const express = require("express");

const Appointment = require("./Models/appointment");
const router = express.Router();

// DELETE methods only
// TODO
// - delete appointment
// - delete apikeys

router.delete("/appointment/:id", function (req, res) {
  res.send("delete appointment");
});

router.delete("/apikey/:id", function (req, res) {
  res.send("delete api key");
});

function print(string) {
  console.log(string);
}

module.exports = router;
