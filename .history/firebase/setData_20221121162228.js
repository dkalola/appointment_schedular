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

    const snapshot = await ref.where("key", "==", key).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      let refupdate = db.collection("users").doc(doc.id);
      // Atomically add a new region to the "regions" array field.
      let array = doc.data().appointments;
      array.push(data);

      console.log(data);

      const unionRes = refupdate.update({
          appointments: FieldValue.arrayUnion({
            guestID: data.guestID,
            location: data.location,
            _id: data._id,
            date: 2022-11-21T22:21:58.789Z
        }),
      });
    });

    return true;
  }
}

module.exports = FirebaseData;
