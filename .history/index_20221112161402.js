const express = require("express");
const appointments_get = require("./app_api_get.js");
const appointments_post = require("./app_api_post");
const indexhtml = require("./app.js");
const app = express();

// api path
app.use("/api", appointments_get);
app.use("/api", appointments_post);

// home page path
app.use("/", indexhtml);

// dev only
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listining on ${port}...`);
});
