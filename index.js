const express = require("express");
const appointments_get = require("./app_api_get.js");
const indexhtml = require("./app.js");
const app = express();

// api path
app.use("/api", appointments_get);

// home page path
app.use("/", indexhtml);

// dev only
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listining on ${port}...`);
});
