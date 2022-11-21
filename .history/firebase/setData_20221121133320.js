const db = require("./firebase.js");

class FirebaseData {
    static setData(collection, data, key) {
        if () {
          
      }
    let ref = db.collection(collection);
    ref.add(data);
  }
}

module.exports = FirebaseData;
