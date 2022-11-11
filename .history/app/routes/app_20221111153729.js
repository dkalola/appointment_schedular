const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

module.exports = app;
