const express = require("express");
// import express from "../express";
const app = express();

const sampleData = [
  {
    date: "23-01-2022",
    slots: 1,
  },
  {
    date: "21-10-2020",
    slots: 4,
  },
];

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.get("/api/data", function (req, res) {
  res.send(sampleData);
});

app.get("/api/data/:id", function (req, res) {
  const queryParam = req.query; // used for api key
  const params = req.params; // used for data retrieval
  res.send(params);
});

// dev only
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listining on ${port}...`);
});
