const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");
let userref = db.collection("users");

class Validate {
  static checkKey(APIkey) {
    // get user with specific api key
    var user = null;
    userref
      .where("key", "==", APIkey)
      .get()
      .then((snapshotuser) => {
        snapshotuser.forEach((doc) => {
          user = doc.data();
        });
      });
  }
}

module.exports = Validate;
