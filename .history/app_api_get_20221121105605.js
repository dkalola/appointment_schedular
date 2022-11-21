const express = require("express");

const router = express.Router();
// const fire = require("./firebase/firebase.js");

const ref = require("./firebase/firebase.js");

// ONLY GET EMTHODS
// TODO
// done - get all
// done - get all appointments
// done - get all guests
// done - get guest by id
// done - get guest by appointment
// done - get appointment by guest
// done - get appointment by id
//

// get all
router.get("/", function (req, res) {
  // read from firestore
  ref.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });
  res.send("True");
});

// get all appointments
router.get("/appointments", function (req, res) {
  const queryParam = req.query; // used for api key
  const sendData = sample_data[0].appointments;
  res.send(sendData);
});

// get all guests
router.get("/guest", function (req, res) {
  const sendData = sample_data[0].guests;
  res.send(sendData);
});

// get guests by id
router.get("/guest/:id", function (req, res) {
  const id = req.params.id;
  const sendData = sample_data[0].guests.find((guest) => guest._id === id);
  res.send(sendData);
});

// get appointment by guest
router.get("/appointment/:guestID", function (req, res) {
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

module.exports = router;
