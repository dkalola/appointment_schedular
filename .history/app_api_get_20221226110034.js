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
  const date = req.query.date;

  let sendData = await FirebaseData.getAppointment(
    id,
    guestID,
    waitTime,
    date,
    key
  );
  res.send(sendData);
});

// Guests - TESTED
router.get("/guests", async function (req, res) {
  const key = req.query.apiKey;
  const id = req.query.guestId;
  const email = req.query.email;

  let sendData = await FirebaseData.getGuest(email, id, key);
  res.send(sendData);
});

// Upcoming Appointments on a particular day depending ont the location - TESTED
router.get("/upcoming", async function (req, res) {
  const key = req.query.apiKey;
  const location = req.query.location;
  const guestID = req.query.guestId ? req.query.guestId : false;
  const days = req.query.days ? req.query.days : false;

  let sendData = await FirebaseData.getUpcoming(location, guestID, days, key);
  res.send(sendData);
});





module.exports = router;
