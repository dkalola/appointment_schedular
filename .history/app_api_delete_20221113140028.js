const express = require("express");
const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// DELETE methods only
// TODO
// - delete appointment
// - delete apikeys

router.delete("/appointment/:id", function (req, res) {
  res.send("delete");
});

router.delete("/apikey/:id", function (req, res) {
  res.send("delete api key");
});

function print(string) {
  console.log(string);
}

module.exports = router;
