const express = require("express");
const router = express.Router();
var FirebaseData = require("./firebase/setData.js");
const Appointment = require("./Models/appointment");
// update user data
router.put("/appointment", async function (req, res) {
  const key = req.query.apiKey;
  const data = req.body;
  const unixTimeZero = Date.parse(data.time);

  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
    time: unixTimeZero,
    amount: data.amount,
    payed: data.payed,
    checkedIn: data.checkedIn,
  });

  var output = await FirebaseData.updateAppointment(
    req.query.appId,
    appointment,
    key
  );
  res.status(201).send(output);
});

// update sub data
router.put("/guest", async function (req, res) {
  const key = req.query.apiKey;
  const data = req.body;
  const guest = new Guest({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  var output = await FirebaseData.updateGuest(
    req.query.guestID,
    appointment,
    key
  );
  res.status(201).send(output);
});



module.exports = router;
