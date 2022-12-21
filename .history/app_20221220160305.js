// // imports
// const express = require("express");
// const app = express();
// const csrf = require("csurf");
// const bodyParser = require("body-parser");
// const admin = require("firebase-admin");
// const cookieParser = require("cookie-parser");

// const csrfMiddleware = csrf({ cookie: true });
// // middlewares
// app.set("view-engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(csrfMiddleware);
// app.use("/static", express.static("public"));

// // routes

// app.all("*", (req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html");
// });

// app.get("/register", (req, res) => {
//   res.sendFile(__dirname + "/views/signup.html");
// });

// app.get("/login", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html");
// });

// app.post("/sessionLogin", (req, res) => {
//   const idToken = req.body.idToken.toString();

//   const expiresIn = 60 * 60 * 24 * 5 * 1000;

//   admin
//     .auth()
//     .createSessionCookie(idToken, { expiresIn })
//     .then(
//       (sessionCookie) => {
//         const options = { maxAge: expiresIn, httpOnly: true };
//         res.cookie("session", sessionCookie, options);
//         res.end(JSON.stringify({ status: "success" }));
//       },
//       (error) => {
//         res.status(401).send("UNAUTHORIZED REQUEST!");
//       }
//     );
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

// app.get("/user", (req, res) => {
//   res.sendFile(__dirname + "/views/user_account.html");
// });

// app.get("/test2", (req, res) => {
//   res.sendFile(__dirname + "/views/test2.html");
// });

// // exports
// module.exports = app;

const express = require("express");
var path = require("path");
const app = express();
const router = express.Router();

// firebase
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

// register
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/signup.html");
});

app.get("/login", (req, res) => {
  FirebaseAuthService.createUser();
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.get("/success", (req, res) => {
  res.redirect("/");
});

module.exports = app;
