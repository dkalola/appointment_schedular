const express = require("express");
var path = require("path");
const app = express();
const router = app.Router();

// firebase

var admin = require("firebase-admin");

// middleware
router.use(app.json());
router.use(app.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/test2", (req, res) => {
  res.sendFile(__dirname + "/views/test2.html");
});

app.get("/date_select", (req, res) => {
  const type = req.query.type;
  const btnc = req.query.btnc;
  const color = req.query.color;
  const key = req.query.apiKey;
  if (key) {
    res.render("date_select", {
      type: type,
      btnc: btnc,
      color: color,
      apiKey: key,
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

    return res.send(user);
    // res.redirect("/");
  } catch (e) {
    res.redirect("register");
  }
});


module.exports = app;
