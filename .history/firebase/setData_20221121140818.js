const db = require("./firebase.js");

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
    ref.where("key", "==", key).update({
      appointments: FieldValue.arrayUnion("greater_virginia"),
    });
  }
}

module.exports = FirebaseData;
