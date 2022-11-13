const express = require("express");
const { generateApiKey } = require("generate-api-key");
const Appointment = require("./Models/appointment");
const Guest = require("./Models/guest");
const User = require("./Models/user");
const router = express.Router();

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// POST

router.post("/appointment", async function (req, res) {
  const data = req.body;
  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
  });
  res.status(201).send(appointment);
});

router.post("/guest", async function (req, res) {
  const data = req.body;
  const guest = new Guest({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });
  res.status(201).send(guest);
});

router.post("/user", async function (req, res) {
  const data = req.body;
  const user = new User({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  // adding api key to the apikey list
  user.apiKeys.push({
    key: generateApiKey(),
  });

  res.status(201).send(user);
});

function print(string) {
  console.log(string);
}

module.exports = router;
