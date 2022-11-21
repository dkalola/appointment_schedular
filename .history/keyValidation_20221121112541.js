const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");
let userref = db.collection("users");

class Validate {
  static checkKey(key) {
    const data = [];
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      console.log(data[0].keyPair);
      const keyPairs = data[0].keyPair;

      keyPairs.forEach((key) => {
        // looping through all key user in API key map
        console.log(key.key);
        const user = userref.where("key", "==", true).get();
      });
    });
  }
}

module.exports = Validate;
