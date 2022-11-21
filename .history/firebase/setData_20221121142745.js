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
    console.log(data);
    let ref = db.collection("users");
    let userID = null;
    await ref
      .where("key", "==", key)
      .get()
      .then((snapshotuser) => {
        console.log(snapshotuser.data);
        let refupdate = db
          .collection("users")
          .doc(userID)
          .update({
            appointments: FieldValue.arrayUnion(data),
          });
      });
    return true;
  }
}

module.exports = FirebaseData;
