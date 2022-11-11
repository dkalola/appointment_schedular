const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.listen(3000, function () {
  console.log("listining...");
});

app.get("/api/data", function (req, res) {});
