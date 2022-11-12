const express = require("express");
const sample_data = require("../data/test_data.js");

const router = express.Router();

// ONLY GET EMTHODS

// get all
router.get("/", function (req, res) {
  res.send(sample_data);
});

// get list of appointments
router.get("/appointments", function (req, res) {
  const queryParam = req.query; // used for api key
  const sendData = sample_data[0].appointments;
  print(sendData);
  res.send(sendData);
});

// get list of guests
router.get("/guest", function (req, res) {
  const sendData = sample_data[0].guests;
  print(sendData);
  res.send(sendData);
});

// get appointment by guest
router.get("/guest/:guestID", function (req, res) {
  const guestID = req.params.guestID;
  const guest = sample_data[0].guests.find((guest) => guest._id === guestID);
  const appointments = sample_data[0].appointments.find(
    (time) => time.guestId === guest._id
  );
  res.send(appointments);
});

// get appointment by id
router.get("/appointments/:appointmentID", function (req, res) {
  const appointmentID = req.params.appointmentID;
  const appointment = sample_data[0].appointments.find(
    (appointment) => appointment._id === appointmentID
  );
  res.send(appointment);
});

// get list of guests by id
router.get("/guest/:id", function (req, res) {
  const id = req.params.id;
  const sendData = sample_data[0].guests.find((guest) => guest._id === id);
  res.send(sendData);
});

module.exports = router;
