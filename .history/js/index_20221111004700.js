const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.listen(3000, function () {
  console.log("listining...");
});

app.get("/api/data", function (req, res) {
  res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});
