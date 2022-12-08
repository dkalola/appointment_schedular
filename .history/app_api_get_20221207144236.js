const express = require("express");
const router = express.Router();
var Validate = require("./keyValidation.js");
const db = require("./firebase/firebase.js");

// get all - TESTED
router.get("/", function (req, res) {
  const key = req.query.apiKey;
  const data = [];
  const ref = db.collection("users");

  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        res.send(data);
      });
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

router.get("/appointments", async function (req, res) {
  const waitTime = req.query.time;
  const key = req.query.apiKey; // used for api key
  const id = req.query.guestId; //
  const apid = req.query.appointmentId; //
  const guest = await Validate.checkKey(key);
  if (guest) {
    if (id && !apid && !waitTime) {
      // send data using guestID

      res.send({
        data: guest.appointments.filter((a) => a.guestID === id),
      });
    }
    if (apid && !id && !waitTime) {
      // Send data using appointment id
      res.send({
        data: guest.appointments.find((guest) => guest._id === apid),
      });
    }
    if (waitTime && (id || apid)) {
      const d = new Date();
      let time = d.getTime() / 1000;
      const timeData = guest.appointments.filter(
        (a) => parseInt(a.time._seconds) >= parseInt(time)
      );
      console.log(timeData);
      res.send({
        data: guest.appointments[0].date._seconds,
      });
    }
    if (!id && !apid && !waitTime) {
      res.send({
        data: guest.appointments,
      });
    }
  } else {
    res.status(404).send("ERROR: API Key not found");
  }
});

// Appointments - TESTED / partial - TODO - get time, get upcoming
// router.get("/appointments", function (req, res) {
//   const waitTime = req.query.time;
//   const key = req.query.apiKey; // used for api key
//   const id = req.query.guestId; //
//   const apid = req.query.appointmentId; //
//   var data = [];
//   const ref = db.collection("users");
//   Validate.checkKey(key).then(
//     // validate the key
//     function (value) {
//       // read from firestore
//       ref.get().then((snapshot) => {
//         snapshot.forEach((doc) => {
//           data.push(doc.data());
//         });
//         // data = data.find((doc) => doc.apiKey === key);
//         if (id) {
//           // send data using guestID

//           res.send({
//             data: data[0].appointments,
//           });
//         }
//         if (apid) {
//           // Send data using appointment id
//           res.send({
//             data: data[0].appointments.find((guest) => guest._id === apid),
//           });
//         }

//         // if (waitTime && (id || apid)) {
//         //   if (id) {
//         //     res.send({
//         //       data: data[0].appointments.filter((guest) => guest._id === apid),
//         //     });
//         //   } else {
//         //   }
//         // }

//         // res.send({
//         //   count: data[0].appointments.length,
//         //   data: data[0].appointments,
//         // });
//       });
//     },
//     function (error) {
//       res.status(404).send("ERROR: API Key not found");
//     }
//   );
// });

// Guests - TESTED
router.get("/guests", function (req, res) {
  const key = req.query.apiKey; // used for api key
  const id = req.query.guestId; //
  const data = [];
  const ref = db.collection("users");
  Validate.checkKey(key).then(
    // validate the key
    function (value) {
      // read from firestore
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });

        if (id) {
          const sendData = {
            data: data[0].guests.find((guest) => guest._id === id),
          };
          res.send(sendData);
        } else {
          const sendData = {
            count: data[0].guests.length,
            data: data[0].guests,
          };
          res.send(sendData);
        }
      });
    },
    function (error) {
      res.send("ERROR: API Key not found");
    }
  );
});

module.exports = router;
