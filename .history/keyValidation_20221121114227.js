const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");
let userref = db.collection("users");

class Validate {
  static async checkKey(APIkey) {
    // get user with specific api key
    var user = null;
    var status = false;
    await userref
      .where("key", "==", APIkey)
      .get()
      .then((snapshotuser) => {
        snapshotuser.forEach((doc) => {
          user = doc.data();
        });
      });

    if (user.status > 0) {
      status = true;
    }

    return await status;
  }
}

module.exports = Validate;
