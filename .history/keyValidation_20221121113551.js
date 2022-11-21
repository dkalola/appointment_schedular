const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");
let userref = db.collection("users");

class Validate {
  static checkKey(APIkey) {
    // get user with specific api key
    const user = doc.data();
    userref
      .where("key", "==", APIkey)
      .get()
      .then((snapshotuser) => {
        snapshotuser.forEach((doc) => {
          console.log(user.status);
          if (user.status > 0) {
            return true;
          }
        });
      });
  }
}

module.exports = Validate;
