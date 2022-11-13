const express = require("express");
const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// DELETE methods only
// TODO
// - delete appointment
// - delete apikey

router.delete("/:id", function (req, res) {
  res.send("delete");
});

function print(string) {
  console.log(string);
}

module.exports = router;
