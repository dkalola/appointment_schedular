const express = require("express");
// const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// POST

router.post("/:guestId?location", async function (req, res) {
  const guestId = req.params.guestId;
  const data = req.body.metaData;
  print(data);
  const appointment = new Appointment({
    guestID: guestId,
  });
  res.send(appointment);
});

function print(string) {
  console.log(string);
}

module.exports = router;
