const express = require("express");
var path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.get("/features", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/pricing", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/blog", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/blog-single", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/blog-single", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
module.exports = app;
