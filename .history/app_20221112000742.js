const express = require("express");
var path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/features", (req, res) => {
  res.sendFile(__dirname + "/views/features.html");
});

app.get("/pricing", (req, res) => {
  res.sendFile(__dirname + "/views/pricing.html");
});

app.get("/blog", (req, res) => {
  res.sendFile(__dirname + "/views/blog.html");
});

app.get("/blog-single", (req, res) => {
  res.sendFile(__dirname + "/views/blog-single.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/views/contact.html");
});
module.exports = app;
