const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");

class Validate {
  static checkKey(key) {
    const data = [];
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
    });
  }
}

module.exports = Validate;
