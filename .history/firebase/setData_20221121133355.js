const db = require("./firebase.js");

class FirebaseData {
  static setData(collection, data, key) {
    const key = req.query.apiKey; // used for api key
    if (key == "divyanshukalola88") {
      let ref = db.collection(collection);
      ref.add(data);
    } else {
      return false;
    }
  }
}

module.exports = FirebaseData;
