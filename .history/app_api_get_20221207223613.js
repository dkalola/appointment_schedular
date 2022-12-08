const express = require("express");
const router = express.Router();
var Validate = require("./keyValidation.js");
const db = require("./firebase/firebase.js");
const FirebaseData = require("./firebase/setData.js");

// TODO

// get all - TESTED
router.get("/", function (req, res) {
  const key = req.query.apiKey;
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

// Appointments - TESTED
router.get("/appointments", async function (req, res) {
  const waitTime = req.query.time;
  const key = req.query.apiKey; // used for api key
  const id = req.query.guestId; //
  const apid = req.query.appointmentId; //
  const next = req.query.next;
  const guest = await Validate.checkKey(key);
  if (await FirebaseData.updateRequest(key)) {
    res
      .status(404)
      .send(
        "You reached the maximum allowed limit! \n Please upgrate the plan to continue."
      );
  } else {
    if (guest) {
      if (id && !apid && !waitTime) {
        // send data using guestID

        res.send({
          data: guest.appointments.filter((a) => a.guestID === id),
        });
      }

      if (apid && !id && !waitTime) {
        // Send data using appointment id
        res.send({
          data: guest.appointments.find((guest) => guest._id === apid),
        });
      }
      if (waitTime && (id || apid)) {
        // get upcoming appointments for guest or by appointment id
        if (id) {
          const d = new Date();
          let time = d.getTime() / 1000;
          const timeData = guest.appointments
            .filter((a) => parseInt(a.time._seconds) >= parseInt(time))
            .filter((a) => a.guestID === id);

          var sendData = [];

          for (let value of timeData) {
            sendData.push({
              data: value,
              appointmentTime: value.time._seconds - time,
              currentTime: time,
            });
          }

          res.send(sendData);
        } else {
          const d = new Date();
          let time = d.getTime() / 1000;
          const timeData = guest.appointments
            .filter((a) => parseInt(a.time._seconds) >= parseInt(time))
            .filter((a) => a._id === apid);

          var sendData = [];

          for (let value of timeData) {
            sendData.push({
              data: value,
              appointmentTime: value.time._seconds - time,
              currentTime: time,
            });
          }

          res.send(sendData);
        }
      }
      if (!id && !apid && !waitTime) {
        res.send({
          data: guest.appointments,
        });
      }
    } else {
      res.status(404).send("ERROR: API Key not found");
    }
  }
});

// Guests - TESTED
router.get("/guests", async function (req, res) {
  const key = req.query.apiKey;
  const id = req.query.guestId;
  const data = [];
  const ref = db.collection("users");
  const guest = await Validate.checkKey(key);
  if (await FirebaseData.updateRequest(key)) {
    res
      .status(404)
      .send(
        "You reached the maximum allowed limit! \n Please upgrate the plan to continue."
      );
  } else {
    if (id) {
      const sendData = {
        data: guest.guests.find((guest) => guest._id === id),
      };
      res.send(sendData);
    } else {
      const sendData = {
        count: guest.guests.length,
        data: guest.guests,
      };
      res.send(sendData);
    }
  }
});

module.exports = router;
