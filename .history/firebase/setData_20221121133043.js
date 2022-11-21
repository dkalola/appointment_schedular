const db = require("./firebase.js");

class FirebaseData {
  static setData(collection, data) {
    let ref = db.collection(collection);
    ref.add(data);
  }
}

module.exports = FirebaseData;
