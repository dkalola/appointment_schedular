const express = require("express");
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
  res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

// app.get("/api/data/:id", function (req, res) {
//   const id = req.params.id;
//   res.send(id);
// });

app.get("/api/data/:id/", function (req, res) {
  const queryParam = req.query; // used for api key
  const params = req.params; // used for data retrieval
  res.send(params);
});

// dev only
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listining on ${port}...`);
});
