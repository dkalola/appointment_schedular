const express = require("express");
const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// PUT
// TODO
// - update user information
// - update sub dates
// - update status code
//

router.put("/user/:id", function (req, res) {
  res.send("update user data");
});

router.put("/user/:id", function (req, res) {
  res.send("update sub data");
});

router.put("/user/:id", function (req, res) {
  res.send("update status code");
});

function print(string) {
  console.log(string);
}

module.exports = router;
