const express = require("express");
// const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// middleware 
router.use(express.json());
router.use(express.urlencoded({extended:false}));



// POST

router.post("/", async function (req, res) {
  // data formate
  {
    guestID;
    location;
  }
  const data = req.body;
  print(apiKey);

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
