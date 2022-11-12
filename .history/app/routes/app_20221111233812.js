const express = require("express");
const app = express();

app.use(express.static("assets"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

app.get("../../../assets/css/test.css", (req, res) => {
  res.sendFile(__dirname + "assets/css/test.css");
});

module.exports = app;

