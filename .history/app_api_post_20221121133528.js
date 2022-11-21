const express = require("express");
const { generateApiKey } = require("generate-api-key");
const Appointment = require("./Models/appointment");
const Guest = require("./Models/guest");
const User = require("./Models/user");
const router = express.Router();
var FirebasegetData = require("./firebase/setData.js");

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

// POST

router.post("/", async function (req, res) {
  const key = req.query.apiKey; // used for api key
  const data = req.body;
  FirebasegetData.setData("users", {
    name: "Yash",
    key: "123abdhsjsdncowdiucnksdjcn",
  });
  res.status(201).send("Task Done");
});

// post appointment
router.post("/appointment", async function (req, res) {
  const data = req.body;
  const appointment = new Appointment({
    guestID: data.guestID,
    location: data.location,
  });
  res.status(201).send(appointment);
});

// post guest
router.post("/guest", async function (req, res) {
  const data = req.body;
  const guest = new Guest({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });
  res.status(201).send(guest);
});

// post user
router.post("/user", async function (req, res) {
  const data = req.body;
  const user = new User({
    name: data.name,
    email: data.email,
    phone: data.phone,
    apiKey: generateApiKey(),
  });
  res.status(201).send(user);
});

function print(string) {
  console.log(string);
}

module.exports = router;
