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

// POST - DONE

router.post("/", async function (req, res) {
  const key = req.query.apiKey; // used for api key
  if (key === undefined) {
    res.status(404).send("API key is required.");
  }
  const data = req.body;
  FirebasegetData.setData("users", data);
  res.status(201).send(data);
});

// post appointment - DONE
router.post("/appointment", async function (req, res) {
  const data = req.body;
  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
  });

  const key = str(req.query.apiKey); // used for api key
  console.log(key);
  if (key === undefined) {
    res.status(404).send("API key is required.");
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

// post guest - DONE
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
  FirebaseData.createGuest(guest, key).then(
    function (value) {
      res.status(201).send(guest);
    },
    function (error) {
      res.status(404).send("ERROR CODE: " + error.message);
    }
  );
});

// post user
router.post("/user", async function (req, res) {
  const data = req.body;
  const user = new User({
    name: data.name,
    email: data.email,
    phone: data.phone,
    apiKey: generateApiKey({ method: "string" }),
  });

  console.log(user);
  // const key = req.query.apiKey; // used for api key
  // if (key === undefined) {
  //   res.status(404).send("API key is required.");
  // }
  const check = FirebaseData.createUser(user).then(
    function (value) {
      res.status(201).send(user);
    },
    function (error) {
      res.status(404).send("ERROR: " + error.message);
    }
  );
});

function print(string) {
  console.log(string);
}

module.exports = router;
