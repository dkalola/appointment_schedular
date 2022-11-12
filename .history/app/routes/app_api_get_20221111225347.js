const express = require("express");
const sample_data = require("../data/test_data.js");

const router = express.Router();

// GET

router.get("/", function (req, res) {
  res.send(sample_data);
});

router.get("/appointments/", function (req, res) {
  const queryParam = req.query; // used for api key
  // const params = req.params; // used for data retrieval
  const sendData = sample_data[0].appointments;
  print(sendData);
  res.send(sendData);
});

router.get("/guest/", function (req, res) {
  const queryParam = req.query; // used for api key
  const sendData = sample_data[0].guests;
  print(sendData);
  res.send(sendData);
});

router.get("/guest/:guestID", function (req, res) {
  const guestID = req.params.guestID; // used for data retrieval

  // find guest
  const guest = sample_data[0].guests.find((guest) => guest._id === guestID);

  // find appointment
  const appointments = sample_data[0].appointments.find(
    (time) => time.guestId === guest._id
  );

  // appoint that matched the guest
  res.send(appointments);
});

module.exports = router;
