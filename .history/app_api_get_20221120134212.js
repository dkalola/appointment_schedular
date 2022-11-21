const express = require("express");

const router = express.Router();
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

async function quickstart() {
  // Obtain a document reference.
  const document = firestore.doc("posts/intro-to-firestore");

  // Enter new data into the document.
  await document.set({
    title: "Welcome to Firestore",
    body: "Hello World",
  });
  console.log("Entered new data into the document");

  // Update an existing document.
  await document.update({
    body: "My first Firestore app",
  });
  console.log("Updated an existing document");

  // Read the document.
  const doc = await document.get();
  console.log("Read the document");

  // Delete the document.
  await document.delete();
  console.log("Deleted the document");
}

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
  // res.send(db);
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
