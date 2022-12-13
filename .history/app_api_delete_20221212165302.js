const express = require("express");
var FirebaseData = require("./firebase/setData.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// DELETE methods only
// TODO
// - delete appointment
// - delete apikeys

// delete appointment
router.delete("/appointment/:id", function (req, res) {
  FirebaseData.updateApp(appointment, key).then(
    function (value) {
      res.status(201).send(appointment);
    },
    function (error) {
      res.status(201).send("ERROR: " + error.message);
    }
  );
});

// delete apikey
router.delete("/apikey/:id", function (req, res) {
  res.send("delete api key");
});

function print(string) {
  console.log(string);
}

module.exports = router;
