const express = require("express");
const sample_data = require("./data/test_data.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// POST

router.post("/", async function (req, res) {
  const 
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
