const express = require("express");
const router = express.Router();
var FirebaseData = require("./firebase/setData.js");

// update user data
router.put("/appointment", function (req, res) {
   const key = req.query.apiKey;

  var output = await FirebaseData.deleteGuest(req.query.guestID, key);
  res.status(201).send(output);
});

// update sub data
router.put("/guest", function (req, res) {
  res.send("update sub data");
});

// update status code
router.put("/user/:id", function (req, res) {
  res.send("update status code");
});

// update appointment
router.put("/appointment/:userId/:guestId", function (req, res) {
  res.send("update appointment");
});

function print(string) {
  console.log(string);
}

module.exports = router;
