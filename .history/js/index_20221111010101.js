const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.get("/api/data", function (req, res) {
  res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

// app.get("/api/data/:id", function (req, res) {
//   const id = req.params.id;
//   res.send(id);
// });

app.get("/api/data/:id/", function (req, res) {
  const queryParam = req.query;
  res.send(queryParam);
  res.send();
});

// dev only
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listining on ${port}...`);
});
