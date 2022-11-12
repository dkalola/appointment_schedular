// const express = require("express");
// const app = express();

// app.use(express.static(__dirname));

// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/test.html");
// });

// module.exports = app;

const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
