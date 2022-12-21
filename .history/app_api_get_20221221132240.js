const express = require("express");
const router = express.Router();
var Validate = require("./keyValidation.js");
const db = require("./firebase/firebase.js");
const FirebaseData = require("./firebase/setData.js");

// TODO

// get all - TESTED
router.get("/user", function (req, res) {
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
  const key = req.query.apiKey;
  const guestID = req.query.guestId;
  const id = req.query.appId; 

  let sendData = await FirebaseData.getAppointment(id, guestID, waitTime, key);
  res.send(sendData);
});

// Guests - TESTED
router.get("/guests", async function (req, res) {
  const key = req.query.apiKey;
  const id = req.query.guestId;
  const email = req.query.email;

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
    } else if (email) {
      const sendData = {
        data: guest.guests.find((guest) => guest.email === email),
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
