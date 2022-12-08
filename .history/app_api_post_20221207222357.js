const express = require("express");
const { generateApiKey } = require("generate-api-key");
const Appointment = require("./Models/appointment");
const Guest = require("./Models/guest");
const User = require("./Models/user");
const router = express.Router();
var FirebaseData = require("./firebase/setData.js");

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
  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
    time: unixTimeZero,
  });

  const key = req.query.apiKey; // used for api key
  if (key === undefined) {
    res.status(404).send("API key is required.");
  }
  if (FirebaseData.updateRequest(key)) {
    res
      .status(404)
      .send(
        "You reached the maximum allowed limit! \n Please upgrate the plan to continue."
      );
  }
  FirebaseData.createAppointment(appointment, key).then(
    function (value) {
      res.status(201).send(appointment);
    },
    function (error) {
      res.status(201).send("ERROR: " + error.message);
    }
  );
});

// post guest - TESTED
router.post("/guest", async function (req, res) {
  const data = req.body;
  const guest = new Guest({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  const key = req.query.apiKey; // used for api key

  if (key === undefined) {
    res.status(404).send("API key is required.");
  }

  if (FirebaseData.updateRequest(key)) {
    res
      .status(404)
      .send(
        "You reached the maximum allowed limit! \n Please upgrate the plan to continue."
      );
  }

  FirebaseData.createGuest(guest, key).then(
    function (value) {
      res.status(201).send(guest);
    },
    function (error) {
      res.status(404).send("ERROR CODE: " + error.message);
    }
  );
});

// post user - TESTED
router.post("/user", async function (req, res) {
    if (FirebaseData.updateRequest(key)) {
      res
        .status(404)
        .send(
          "You reached the maximum allowed limit! \n Please upgrate the plan to continue."
        );
    } else {
      const data = req.body;
      const user = new User({
        name: data.name,
        email: data.email,
        phone: data.phone,
        apiKey: generateApiKey({
          method: "string",
          pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        }),
      });

      const key = req.query.apiKey; // used for api key
      if (key === undefined) {
        res.status(404).send("API key is required.");
      }

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
