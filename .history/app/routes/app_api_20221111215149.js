const express = require("express");
const sample_data = require("./../data/test_data.js");

const router = express.Router();

// GET

router.get("/", function (req, res) {
  res.send(sample_data);
});

router.get("/appointments/", function (req, res) {
  const queryParam = req.query; // used for api key
  const params = req.params; // used for data retrieval
  const sendData = sample_data["appointments"];
  print(sendData);
  res.send("get one");
});

// POST

router.post("/", function (req, res) {
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
