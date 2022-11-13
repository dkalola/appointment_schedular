const express = require("express");
// const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// middleware 
app.use(express.json())


// POST

router.post("/:guestId", async function (req, res) {
  const guestId = req.params.guestId;
  const location = req.query.location; // path = api/:guestId?location=[location]
  print(apiKey);
  const data = req.body.metaData;
  print(data);
  const appointment = new Appointment({
    guestID: guestId,
  });
  res.send(appointment);
});

function print(string) {
  console.log(string);
}

module.exports = router;
