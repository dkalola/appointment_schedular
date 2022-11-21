const db = require("./firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

class FirebaseData {
  static setData(collection, data, key) {
    if (key == "divyanshukalola88") {
      let ref = db.collection(collection);
      ref.add(data);
    } else {
      return false;
    }
  }

  static async createAppointment(data, key) {
    const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
    console.log(data);
    let ref = db.collection("users");
    let userID = null;
    const snapshot = await ref.where("key", "==", key).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      let refupdate = db.collection("users").doc(doc.id);
      // Atomically add a new region to the "regions" array field.
      const unionRes = refupdate.update({
        appointments: FieldValue.arrayUnion(data),
      });
    });

    return true;
  }
}

module.exports = FirebaseData;
