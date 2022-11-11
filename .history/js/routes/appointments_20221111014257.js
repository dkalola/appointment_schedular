const express = require("express");

const router = express.Router();

// GET

router.get("/api/data", function (req, res) {
  res.send("get all");
});

router.get("/api/data/:id", function (req, res) {
  const queryParam = req.query; // used for api key
  const params = req.params; // used for data retrieval
  res.send("get one");
});

// POST

router.post("/api/data", function (req, res) {
  res.send("post");
});

// DELETE

router.delete("/:id", function (req, res) {
  res.send("delete");
});

// PATCH

router.put("/:id", function (req, res) {
  res.send("put");
});

module.exports = router;
