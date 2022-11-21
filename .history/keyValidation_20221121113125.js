const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");
let userref = db.collection("users");

class Validate {
  static checkKey(APIkey) {
    const data = [];
    // get user with specific api key
    userref
      .where("key", "==", APIkey)
      .get()
      .then((snapshotuser) => {
        snapshotuser.forEach((doc) => {

            const user = doc.data();
            if(doc.)
        });
      });
  }
}

module.exports = Validate;
