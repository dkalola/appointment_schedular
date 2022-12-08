const express = require("express");

const router = express.Router();
// const fire = require("./firebase/firebase.js");
var Validate = require("./keyValidation.js");

const db = require("./firebase/firebase.js");

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

// get all - DONE
router.get("/", function (req, res) {
  const key = req.query.apiKey; // used for api key
  const data = [];
  const ref = db.collection("users");

  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        res.send(data);
      });
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

// get all appointments
router.get("/appointments", function (req, res) {
  const key = req.query.apiKey; // used for api key
  const id = req.query.guestId; //
  const apid = req.query.appointmentId; //
  const data = [];
  const ref = db.collection("users");
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        const sendData = {};
        if (id) {
          sendData = {
            data: data[0].appointments.find(
              (guest) => guest.guestID === guestID
            ),
            cont: data[0].appointments.find(
              (guest) => guest.guestID === guestID
            ).length,
          };
        }

        if (apid) {
          sendData = {
            data: data[0].appointments.find((guest) => guest._id === apid),
            cont: data[0].appointments.find(
              (guest) => guest.guestID === guestID
            ).length,
          };
        }
        // const sendData = {
        //   count: data[0].appointments.length,
        //   data: data[0].appointments,
        // };
        res.send(sendData);
      });
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

// get all guests
router.get("/guests", function (req, res) {
  const key = req.query.apiKey; // used for api key
  const id = req.query.guestId; //
  const data = [];
  const ref = db.collection("users");
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });

        if (id) {
          const sendData = {
            data: data[0].guests.find((guest) => guest._id === id),
          };
          res.send(sendData);
        } else {
          const sendData = {
            count: data[0].guests.length,
            data: data[0].guests,
          };
          res.send(sendData);
        }
      });
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
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
