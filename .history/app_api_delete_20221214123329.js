const express = require("express");
var FirebaseData = require("./firebase/setData.js");
const Appointment = require("./Models/appointment");
const router = express.Router();


// delete appointment
router.delete("/appointment", async function (req, res) {
  const key = req.query.apiKey;

  var output = await FirebaseData.updateApp(req.query.appId, key);
});

// delete guests
router.delete("/guest", async function (req, res) {
  const key = req.query.apiKey;

  var output = await FirebaseData.updateGuest(req.query.guestID, key);
  res.status(201).send(output);
});


module.exports = router;
