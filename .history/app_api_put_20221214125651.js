const express = require("express");
const router = express.Router();
var FirebaseData = require("./firebase/setData.js");

// update user data
router.put("/appointment", async function (req, res) {
  const key = req.query.apiKey;
  const data = req.body;

  var output = await FirebaseData.updateAppointment(req.query.appId,req., key);
  res.status(201).send(output);
});

// update sub data
router.put("/guest", async function (req, res) {
  res.send("update sub data");
});



module.exports = router;
