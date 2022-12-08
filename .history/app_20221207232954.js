const express = require("express");
var path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/test2", (req, res) => {
  res.sendFile(__dirname + "/views/test2.html");
});

app.get("/test", (req, res) => {
  const type = req.query.type;

  if (type) {
    res.render("test", { type: type });
  }
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

app.get("/user", (req, res) => {
  res.sendFile(__dirname + "/views/user_account.html");
});
module.exports = app;
