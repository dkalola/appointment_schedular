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
        if (id) {
          // send data using guestID
          res.send({
            data: data[0].appointments.find((guest) => guest.guestID === id),
          });
        }
        if (apid) {
          // Send data using appointment id
          res.send({
            data: data[0].appointments.find((guest) => guest._id === apid),
          });
        }

        res.send({
          count: data[0].appointments.length,
          data: data[0].appointments,
        });
      });
    },
    function (error) {
      res.status(404).send("ERROR: API Key not found");
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





module.exports = router;
