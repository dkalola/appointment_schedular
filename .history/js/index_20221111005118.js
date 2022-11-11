const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.get("/api/data", function (req, res) {
  res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

// dev only
const port = process.env.PORT || 3000;
app.listen(3000, function () {
  console.log("listining...");
});
