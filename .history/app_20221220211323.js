const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");

require("./firebase/firebase_service");

// ********************************* firebase *********************************
var admin = require("firebase-admin");

// ********************************* middleware *********************************
const csrfMiddleware = csrf({ cookie: true });
const app = express();
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

// ********************************* routes *********************************

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

// ********************************* sessions *********************************

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

// ********************************* session end *********************************

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/test2", (req, res) => {
  res.sendFile(__dirname + "/views/test2.html");
});

// ********************************* date select *********************************
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

// ********************************* register / login / logout *********************************
app.get("/register", (req, res) => {
  res.render("signup", { csrfToken: "req.csrfToken()" });
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
