const express = require("express");
// const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const Appointment = require("./Models/appointment");
const router = express.Router();

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));



// POST

router.post("/appointment", async function (req, res) {
  const data = req.body;
  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
  });
  res.send(appointment);
});

router.post("/guest", async function (req, res) {
  const data = req.body;
  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
  });
  res.send(appointment);
});

function print(string) {
  console.log(string);
}

module.exports = router;
