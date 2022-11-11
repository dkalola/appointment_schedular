const express = require("express");

const router = express.Router();

// GET

app.get("/api/data", function (req, res) {
  res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

app.get("/api/data/:id", function (req, res) {
  const queryParam = req.query; // used for api key
  const params = req.params; // used for data retrieval
  res.send(params);
});

// POST

app.post("/api/data", function (req, res) {});

// DELETE

app.delete("/api/data/:id", function (req, res) {});

// PATCH

app.put("/api/data/:id", function (req, res) {});

module.exports = router;
