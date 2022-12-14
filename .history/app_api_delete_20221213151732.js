const express = require("express");
var FirebaseData = require("./firebase/setData.js");
const Appointment = require("./Models/appointment");
const router = express.Router();

// DELETE methods only
// TODO
// - delete appointment
// - delete apikeys

// delete appointment
router.delete("/appointment", function (req, res) {
  const key = req.query.apiKey;
    if (await FirebaseData.updateRequest(key)) {
    res
      .status(404)
      .send(
        "You reached the maximum allowed limit! \n Please upgrate the plan to continue."
      );
    } else {
        FirebaseData.updateApp(req.query.appId, key).then(
          function (value) {
            res.status(201).send(value);
          },
          function (error) {
            res.status(201).send("ERROR: " + error.message);
          }
        );
   }

});

// delete guests
router.delete("/guest", function (req, res) {
   const key = req.query.apiKey;
   FirebaseData.updateGuest(req.query.guestID, key).then(
     function (value) {
       res.status(201).send(value);
     },
     function (error) {
       res.status(201).send("ERROR: " + error.message);
     }
   );
});

function print(string) {
  console.log(string);
}

module.exports = router;
