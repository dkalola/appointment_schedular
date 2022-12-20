// const express = require("express");
// const app = express();
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const flash = require("express-flash");
// const session = require("express-session");
// const methodOverride = require("method-override");
// const db = require("./firebase/firebase");
// const User = require("./Models/user");
// const { generateApiKey } = require("generate-api-key");
// const FirebaseData = require("./firebase/setData");

// const initializePassport = require("./config/passport");
// initializePassport(
//   passport,
//   async (email) => {
//     let ref = db.collection("users");
//     const snapshot = await ref.where("email", "==", email).get();
//     return snapshot.docs[0].data().email;
//   },
//   async (id) => {
//     let ref = db.collection("users");
//     const snapshot = await ref.where("_id", "==", id).get();
//     return snapshot.docs[0].data()._id;
//   }
// );

// const users = [];

// app.set("view-engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// app.use(flash());
// app.use(
//   session({
//     secret: "test",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(methodOverride("_method"));

// app.use("/static", express.static("public"));

// app.get("/", (req, res) => {
//   // res.render("index.ejs", { name: req.user.name });
//   res.sendFile(__dirname + "/views/index.html");
// });

// // login system

// app.get("/login", checkNotAuthenticated, (req, res) => {
//   res.render("login.ejs");
// });

// app.post(
//   "/login",
//   checkNotAuthenticated,
//   passport.authenticate("local", {
//     successRedirect: "/user",
//     failureRedirect: "/login",
//     failureFlash: true,
//   })
// );

// app.get("/register", checkNotAuthenticated, (req, res) => {
//   res.render("register.ejs");
// });

// app.post("/register", checkNotAuthenticated, async (req, res) => {
//   try {
//     const data = req.body;
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const user = new User({
//       _id: generateApiKey({
//         method: "string",
//         length: 32,
//         pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       }),
//       name: data.name,
//       email: data.email,
//       phone: data.phone,
//       apiKey: generateApiKey({
//         method: "string",
//         length: 30,
//         pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       }),
//       password: hashedPassword,
//     });
//     console.log(user);
//     FirebaseData.createUser(
//       user,
//       "4173c4a9edff6a1d4850c3e25ed462c0df670cd9218beac91a5f9ae1be57b629"
//     ).then(
//       function (value) {
//         res.redirect("/login");
//       },
//       function (error) {
//         res.redirect("/register");
//       }
//     );
//     // users.push({
//     //   id: Date.now().toString(),
//     //   name: req.body.name,
//     //   email: req.body.email,
//     //   password: hashedPassword,
//     // });
//     // res.redirect("/login");
//   } catch (err) {
//     console.log(err);
//     res.redirect("/register");
//   }
// });

// app.delete("/logout", (req, res) => {
//   req.logOut();
//   res.redirect("/login");
// });

// // other links

// app.get("/docs", (req, res) => {
//   res.sendFile(__dirname + "/views/docs.html");
// });

// app.get("/pricing", (req, res) => {
//   res.sendFile(__dirname + "/views/pricing.html");
// });

// app.get("/blog", (req, res) => {
//   res.sendFile(__dirname + "/views/blog.html");
// });

// app.get("/blog-single", (req, res) => {
//   res.sendFile(__dirname + "/views/blog-single.html");
// });

// app.get("/contact", (req, res) => {
//   res.sendFile(__dirname + "/views/contact.html");
// });

// app.get("/user", checkAuthenticated, (req, res) => {
//   res.sendFile(__dirname + "/views/user_account.html");
// });

// app.get("/test2", (req, res) => {
//   res.sendFile(__dirname + "/views/test2.html");
// });

// app.get("/date_select", (req, res) => {
//   if (req.query.apiKey) {
//     res.render("date_select", {
//       type: req.query.type ? req.query.type : 1,
//       btnc: req.query.type == 0 && req.query.btnc ? req.query.btnc : "E0E0E0",
//       color:
//         req.query.type == 0 && req.query.color ? req.query.color : "646464",
//       apiKey: req.query.apiKey,
//       br: req.query.br ? req.query.br : 10,
//       testVersions: req.query.testVersions == 1 ? 1 : 0,
//     });
//   } else {
//     res.status(404).send("API Key Not Found");
//   }
// });

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res.redirect("/login");
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   next();
// }

// module.exports = app;


// imports
const express = require("express");
const app = express();
const csrf = require("csurf");

// middlewares
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("public"));


// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/signup.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


// exports
module.exports = app;
