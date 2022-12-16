const express = require("express");
var path = require("path");
const app = express();
const router = express.Router();


// firebase
// import firebase from "firebase/compat/app";
// import * as firebaseui from "firebaseui";
// import "firebaseui/dist/firebaseui.css";
var firebase = require("firebase/compat/app");
var firebaseui = require("firebaseui");

var admin = require("firebase-admin");

// middleware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/test2", (req, res) => {
  res.sendFile(__dirname + "/views/test2.html");
});

app.get("/date_select", (req, res) => {

  if (req.query.apiKey) {
    res.render("date_select", {
      type: req.query.type ? req.query.type : 1,
      btnc: req.query.type == 0 && req.query.btnc ? req.query.btnc : "E0E0E0",
      color:
        req.query.type == 0 && req.query.color ? req.query.color : "646464",
      apiKey: req.query.apiKey,
      br: req.query.br ? req.query.br : 10,
      testVersions: req.query.testVersions == 1 ? 1 : 0,
    });
  } else {
    res.status(404).send("API Key Not Found");
  }
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
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

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().createUser({
      email,
      password,
    });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

// login items
app.get("/login", (req, res) => {
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.get("/success", (req, res) => {
  res.redirect("/");
});


module.exports = app;
