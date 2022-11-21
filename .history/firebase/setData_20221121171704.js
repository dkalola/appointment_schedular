const db = require("./firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

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
        reqCountCurrent: data.reqCountCurrent,
        reqCountMax: data.reqCountMax,
        statusCode: data.statusCode,
        _id: data._id,
        date: data.date,
      });
    } else {
      return false;
    }
  }

  static async createAppointment(data, key) {
    let ref = db.collection("users");

    const snapshot = await ref.where("key", "==", key).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return false;
    }

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);
      // add data
      const unionRes = refupdate.update({
        appointments: FieldValue.arrayUnion({
          guestID: data.guestID,
          location: data.location,
          _id: data._id,
          date: data.date,
        }),
      });
      return true;
    });
  }

  static async createGuest(data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("apiKey", "==", key).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return false;
    }

    snapshot.forEach((doc) => {
      let refupdate = db.collection("users").doc(doc.id);
      let oldData = doc.data();

      let check = oldData.guests.find(
        (d) => d.email === data.email || d.name === data.name
      );
      if (check !== undefined) {
        return false;
      } else {
        // add data
        const unionRes = refupdate.update({
          guests: FieldValue.arrayUnion({
            name: data.name,
            email: data.email,
            phone: data.phone,
            _id: data._id,
            date: data.date,
          }),
        });
      }

      return true;
    });
  }

  static async createUser(data, key) {
    let ref = db.collection("users");
    const snapshot = await ref.where("email", "==", data.email).get();
    if (!snapshot.exists) {
      FirebaseData.setData("users", data, "divyanshukalola88");
      return true;
    } else {
      return false;
    }
  }
}

module.exports = FirebaseData;
