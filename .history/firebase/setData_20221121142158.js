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
    let ref = db.collection("users");
    let userID = null;
    await ref
      .where("key", "==", key)
      .get()
      .then((snapshotuser) => {
        snapshotuser.forEach((doc) => {
          userID = doc.id;
        });
        let refupdate = db.collection("users");
      });
    return true;
  }
}

module.exports = FirebaseData;
