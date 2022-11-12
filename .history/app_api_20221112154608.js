const express = require("express");
const sample_data = require("./data/test_data.js");
const mongoose = require("mongoose");
const router = express.Router();


// POST

router.post("/", function (req, res) {
  const sendData = sample_data[0].customers;
  res.send("post");
});

// DELETE

router.delete("/:id", function (req, res) {
  res.send("delete");
});

// PUT

router.put("/:id", function (req, res) {
  res.send("put");
});

function print(string) {
  console.log(string);
}

module.exports = router;
