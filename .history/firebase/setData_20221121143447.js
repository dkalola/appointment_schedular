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
    const snapshot = await ref.where("key", "==", key).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
        ref.doc(doc.id);
        // Atomically add a new region to the "regions" array field.
const unionRes = await washingtonRef.update({
  regions: FieldValue.arrayUnion('greater_virginia')
});
    });

    return true;
  }
}

module.exports = FirebaseData;
