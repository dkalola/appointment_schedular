const express = require("express");
// import express from "../express";
const app = express();

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

// dev only
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listining on ${port}...`);
});
