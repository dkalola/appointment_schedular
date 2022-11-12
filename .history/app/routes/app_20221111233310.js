const express = require("express");
const app = express();

app.use(express.static(__dirname + "/app/assets"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

module.exports = app;

