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

router.put("/:id", function (req, res) {
  res.send("put");
});

function print(string) {
  console.log(string);
}

module.exports = router;
