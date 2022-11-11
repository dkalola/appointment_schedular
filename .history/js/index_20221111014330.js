const express = require("express");
const appointments = require("./routes/appointments.js");
const app = express();

app.use("/api/appointments", appointments);

// dev only
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listining on ${port}...`);
});
