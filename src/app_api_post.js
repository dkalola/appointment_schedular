const express = require("express");
const { generateApiKey } = require("generate-api-key");
const Appointment = require("../Models/appointment");
const Guest = require("../Models/guest");
const User = require("../Models/user");
const router = express.Router();
var FirebaseData = require("../firebase/setData.js");
const mongoose = require("mongoose");

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// ONLY POST EMTHODS
// TODO
// done - POST appointment
// done - POST guest
// done - POST User
// - Connect to db and get the user's data
// - populate the schema and perform the functions

// post appointment - TESTED
router.post("/appointment", async function (req, res) {
  const data = req.body;
  const unixTimeZero = Date.parse(data.time);
  const key = req.query.apiKey;

  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
    time: unixTimeZero,
  });

  if (key === undefined) {
    res.status(404).send("API key is required.");
  }

  var output = await FirebaseData.createAppointment(appointment, key);
  res.status(201).send(output);
});

// post guest - TESTED
router.post("/guest", async function (req, res) {
  const data = req.body;
  const key = req.query.apiKey;

  const guest = new Guest({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  if (key === undefined) {
    res.status(404).send("API key is required.");
  }
  var output = await FirebaseData.createGuest(guest, key);
  res.status(201).send(output);
});

// post user - TESTED
router.post("/user", async function (req, res) {
  const data = req.body;
  const key = req.query.apiKey;
  if (key === undefined) {
    res.status(404).send("API key is required.");
  }
  console.log(data._id);
  if (data._id === undefined) {
    const user = new User({
      _id: generateApiKey({
        method: "string",
        length: 32,
        pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      }),
      name: data.name,
      email: data.email,
      phone: data.phone,
      apiKey: generateApiKey({
        method: "string",
        length: 30,
        pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      }),
    });
    FirebaseData.createUser(user, key).then(
      function (value) {
        res.status(201).send(user);
      },
      function (error) {
        res.status(404).send("ERROR: " + error.message);
      }
    );
  } else {
    const user = new User({
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      apiKey: generateApiKey({
        method: "string",
        length: 30,
        pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      }),
    });
    FirebaseData.createUser(user, key).then(
      function (value) {
        res.status(201).send(user);
      },
      function (error) {
        res.status(404).send("ERROR: " + error.message);
      }
    );
  }
});

module.exports = router;
