const express = require("express");
const app = express();

app.use(express.static("assets"));

app.set("view engine", "ejs");
app.use("/css", express.static(__dirname + "assets/css"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/test.html");
});


module.exports = app;

