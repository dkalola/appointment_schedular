const express = require("express");

const router = express.Router();
// const fire = require("./firebase/firebase.js");
var Validate = require("./keyValidation.js");

const db = require("./firebase/firebase.js");

// ONLY GET EMTHODS
// TODO
// done - get all
// done - get all appointments
// done - get all guests
// done - get guest by id
// done - get guest by appointment
// done - get appointment by guest
// done - get appointment by id
//

// get all - DONE
router.get("/", function (req, res) {
  const key = req.query.apiKey; // used for api key

  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      if (value == false) {
        res.send("Check your Subscription!");
      }
      res.send(value); // send user oject
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

// get all appointments
router.get("/appointments", function (req, res) {
  const key = req.query.apiKey; // used for api key
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      if (value == false) {
        res.send("Check your Subscription!");
      }
      if (value.appointments) {
        res.send(value.appointments);
      }
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

// get all guests
router.get("/guest", function (req, res) {
  const key = req.query.apiKey; // used for api key
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      if (value == false) {
        res.send("Check your Subscription!");
      }
      if (value.guests) {
        res.send(value.guests);
      } else {
        res.send("No data to display!");
      }
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

// get guests by id
router.get("/guest/:id", function (req, res) {
  const id = req.params.id;

  const key = req.query.apiKey; // used for api key
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      if (value == false) {
        res.send("Check your Subscription!");
      }
      if (value.guests) {
        const sendData = value.guests.find((guest) => guest._id === id);
        res.send(sendData);
      } else {
        res.send("No data to display!");
      }
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

// get appointment by guest
router.get("/appointment/:guestID", function (req, res) {
  const guestID = req.params.guestID;

  const key = req.query.apiKey; // used for api key
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      if (value == false) {
        res.send("Check your Subscription!");
      }
      if (value.guests) {
        const guest = value.guests.find((guest) => guest._id === guestID);
        const appointments = value.appointments.find(
          (time) => time.guestId === guest._id
        );
        res.send(appointments);
      } else {
        res.send("No data to display!");
      }
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

// get appointment by id
router.get("/appointments/:appointmentID", function (req, res) {
  const appointmentID = req.params.appointmentID;
  const appointment = sample_data[0].appointments.find(
    (appointment) => appointment._id === appointmentID
  );
  const key = req.query.apiKey; // used for api key
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      if (value == false) {
        res.send("Check your Subscription!");
      }
      if (value.guests) {
        const guest = value.guests.find((guest) => guest._id === guestID);
        const appointments = value.appointments.find(
          (time) => time.guestId === guest._id
        );
        res.send(appointments);
      } else {
        res.send("No data to display!");
      }
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

module.exports = router;
