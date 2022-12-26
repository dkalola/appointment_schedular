const express = require("express");
var FirebaseData = require("./firebase/setData.js");
const router = express.Router();

// delete appointment
router.delete(
  "/appointment",
  async function (req, res, next) {
    const key = req.query.apiKey;
    let checkUser = await FirebaseData.checkStatus(key);
    if (checkUser.status) {
      next();
    } else {
      res.send(checkUser);
    }
  },
  async function (req, res) {
    const key = req.query.apiKey;

    var output = await FirebaseData.deleteApp(req.query.appId, key);
    res.status(201).send(output);
  }
);

// delete guests
router.delete(
  "/guest",
  async function (req, res, next) {
    const key = req.query.apiKey;
    let checkUser = await FirebaseData.checkStatus(key);
    if (checkUser.status) {
      next();
    } else {
      res.send(checkUser);
    }
  },
  async function (req, res) {
    const key = req.query.apiKey;

    var output = await FirebaseData.deleteGuest(req.query.guestID, key);
    res.status(201).send(output);
  }
);

module.exports = router;
