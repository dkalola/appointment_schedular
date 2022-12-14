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

    var app = (await appointments.where("_id", "=", id).get()).docs[0].id;
    const res = appointments.doc(app).delete();
    return { status: true, message: "Appointment deleted successfully" };
  }

  static async deleteGuest(id, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      return { status: false, message: "API Key not found!" };
    }

    let docID = snapshot.docs[0].id;

    let guest = db.collection("users").doc(docID).collection("guests");
    let ap = db.collection("users").doc(docID).collection("appointments");

    var app = (await guest.where("_id", "=", id).get()).docs[0].id;
    guest.doc(app).delete();
    const res = ap.where("guestID", "=", id);

    res.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    return { status: true, message: "Guest deleted successfully" };
  }

  static async updateAppointment(id, data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();
    if (snapshot.empty) {
      throw new Error("API Key not found!");
    }

    let docID = snapshot.docs[0].id;
    let ap = await db
      .collection("users")
      .doc(docID)
      .collection("appointments")
      .where("_id", "=", id)
      .get().docs[0].id;

    const docRef = db
      .collection("users")
      .doc(docID)
      .collection("appointments")
      .doc(ap);

    const res = await docRef.update({
      amount: data.amount,
      checkedIn: data.checkedIn,
      name: data.name,
    });
  }
}

module.exports = FirebaseData;
