const express = require("express");
// const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const Guest = require("./Models/guest");
const User = require("./Models/guest");
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
  res.status(201).send(appointment);
});

router.post("/guest", async function (req, res) {
  const data = req.body;
  const guest = new Guest({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });
  res.status(201).send(guest);
});

router.post("/user", async function (req, res) {
  const data = req.body;

  const user = 
});

function print(string) {
  console.log(string);
}

module.exports = router;
