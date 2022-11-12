const express = require("express");
var path = require("path");
const app = express();

app.use(express.static("assets"));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});

module.exports = app;
