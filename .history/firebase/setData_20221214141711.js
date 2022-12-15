const db = require("./firebase.js");
var cookieSession = require("cookie-session");
const { FieldValue } = require("firebase-admin/firestore");


class FirebaseData {
  static setData(collection, data, key) {
    if (key == "divyanshukalola88") {
      // change this to env
      let ref = db.collection(collection);
      ref.add({
        apiKey: data.apiKey,
        name: data.name,
        email: data.email,
        phone: data.phone,
        reqCountCurrent: data.reqCountCurrent + 1,
        reqCountMax: data.reqCountMax,
        statusCode: data.statusCode,
        _id: data._id,
        date: data.date,
      });
    } else {
      throw new Error("API Key does not match our records!");
    }
  }

  // get Appointment

  static async getAppointment(id, guestID, wait, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      return { status: false, message: "API Key not found!" };
    }
    let docID = snapshot.docs[0].id;
    let user = db.collection("users").doc(docID);

    if (id && !guestID && !wait) {
      // get by appointment id
      let appointment = await user
        .collection("appointments")
        .where("_id", "=", id)
        .get();

      const docData = appointment.docs[0].data();
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });

      return docData;
    } else if (!id && guestID && !wait) {
      // get by guest id
      let appointment = await user
        .collection("appointments")
        .where("guestID", "=", guestID)
        .get();

      const docData = new Array();

      appointment.forEach((doc) => {
        docData.push(doc.data());
        user.update({
          reqCountCurrent: FieldValue.increment(1),
        });
      });

      return docData;
    } else if (wait && guestID && !id) {
      console.log("Waiting for guest");
      // get upcoming appointments
      const d = new Date();
      let time = d.getTime() / 1000;

      let appointment = await user
        .collection("appointments", (ref) =>
          ref.where("guestID", "=", guestID).where("time", ">", d)
        )

        .get();

      const docData = new Array();

      appointment.forEach((doc) => {
        docData.push(doc.data());
        user.update({
          reqCountCurrent: FieldValue.increment(1),
        });
      });

      return docData;
    } else if (!id && !guestID && !wait) {
      // get all
      let appointment = await user.collection("appointments").get();

      const docData = new Array();

      appointment.forEach((doc) => {
        docData.push(doc.data());
        user.update({
          reqCountCurrent: FieldValue.increment(1),
        });
      });

      return docData;
    }
  }

  // create appointment
  static async createAppointment(data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();

    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }
    let docID = snapshot.docs[0].id;

    let appointments = db
      .collection("users")
      .doc(docID)
      .collection("appointments");
    let guests = db.collection("users").doc(docID).collection("guests");
    let user = db.collection("users").doc(docID);
    let userData = await (await user.get()).data();

    if (userData.reqCountCurrent >= userData.reqCountMax) {
      return { status: false, message: "Maximum number of requests exceeded!" };
    }

    let check = await guests.where("_id", "=", data.guestID).get();

    if (check.empty) {
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return { status: false, message: "Guest not found!" };
    } else {
      appointments.add({
        guestID: data.guestID,
        location: data.location,
        _id: data._id,
        date: data.date,
        checkedIn: data.checkedIn,
        amount: data.amount,
        payed: data.payed,
        time: data.time,
      });
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return {
        status: true,
        guestID: data.guestID,
        location: data.location,
        _id: data._id,
        date: data.date,
        checkedIn: data.checkedIn,
        amount: data.amount,
        payed: data.payed,
        time: data.time,
      };
    }
  }

  // create guest
  static async createGuest(data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();

    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }
    let docID = snapshot.docs[0].id;

    let guests = db.collection("users").doc(docID).collection("guests");
    let user = db.collection("users").doc(docID);

    let userData = await (await user.get()).data();

    if (userData.reqCountCurrent >= userData.reqCountMax) {
      return { status: false, message: "Maximum number of requests exceeded!" };
    }

    let check = await guests.where("email", "=", data.email).get();

    if (!check.empty) {
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return { status: false, message: "Email already registered!" };
    } else {
      // add data
      guests.add({
        name: data.name,
        email: data.email,
        phone: data.phone,
        _id: data._id,
        date: data.date,
      });

      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });

      return {
        status: true,
        name: data.name,
        email: data.email,
        phone: data.phone,
        _id: data._id,
        date: data.date,
      };
    }
  }

  // create user
  static async createUser(data, key) {
    if (key == "divyanshukalola88") {
      let ref = db.collection("users");
      const snapshot = await ref.where("email", "==", data.email).get();

      if (snapshot.empty) {
        FirebaseData.setData("users", data, "divyanshukalola88");
        return true;
      } else {
        throw new Error("Email already in exsist!");
      }
    } else {
      throw new Error("You are not Authorised to create a new user!");
    }
  }

  // delete appointment
  static async deleteApp(id, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }

    let docID = snapshot.docs[0].id;

    let appointments = db
      .collection("users")
      .doc(docID)
      .collection("appointments");

    var app = await appointments.where("_id", "=", id).get();
    let ap = app.docs[0].id;
    if (app.empty) {
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return { status: false, message: "Appointment not found!" };
    } else {
      const res = appointments.doc(ap).delete();
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return { status: true, message: "Appointment deleted successfully" };
    }
  }

  // delete guest
  static async deleteGuest(id, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      return { status: false, message: "API Key not found!" };
    }

    let docID = snapshot.docs[0].id;

    let guest = db.collection("users").doc(docID).collection("guests");
    let ap = db.collection("users").doc(docID).collection("appointments");

    var app = await guest.where("_id", "=", id).get();
    let apID = app.docs[0].id;

    if (app.empty) {
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return { status: false, message: "Guest not found!" };
    } else {
      guest.doc(apID).delete();
      const res = ap.where("guestID", "=", id);

      res.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });

      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });

      return { status: true, message: "Guest deleted successfully" };
    }
  }

  // update appointment
  static async updateAppointment(id, data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      return { status: false, message: "API Key not found!" };
    }

    let docID = snapshot.docs[0].id;
    let user = db.collection("users").doc(docID);

    let appointment = await user
      .collection("appointments")
      .where("_id", "=", id)
      .get();

    if (appointment.empty) {
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return { status: false, message: "Appointment not found!" };
    } else {
      const docRef = user
        .collection("appointments")
        .doc(appointment.docs[0].id);

      const res = await docRef.update({
        amount: data.amount,
        checkedIn: data.checkedIn,
        time: data.time,
        guestID: data.guestID,
        location: data.location,
        payed: data.payed,
      });

      let sendData = (await docRef.get()).data();

      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });

      return sendData;
    }
  }

  // update guest
  static async updateGuest(id, data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      return { status: false, message: "API Key not found!" };
    }

    let docID = snapshot.docs[0].id;
    let user = db.collection("users").doc(docID);

    let guest = await user.collection("guests").where("_id", "=", id).get();

    if (guest.empty) {
      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });
      return { status: false, message: "Guest not found!" };
    } else {
      const docRef = user.collection("guests").doc(guest.docs[0].id);

      const res = await docRef.update({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      let sendData = (await docRef.get()).data();

      user.update({
        reqCountCurrent: FieldValue.increment(1),
      });

      return sendData;
    }
  }
}

module.exports = FirebaseData;
