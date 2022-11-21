const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");
let userref = db.collection("users");

class Validate {
  async getData(key) {
    var user = null;
    await userref
      .where("key", "==", key)
      .get()
      .then((snapshotuser) => {
        snapshotuser.forEach((doc) => {
          user = doc.data();
        });
      });

    return user;
  }
  static checkKey(APIkey) {
    // get user with specific api key
    var user = getData(APIkey);
    var status = false;

    if (user.status > 0) {
      status = true;
    }

    return await status;
  }
}

module.exports = Validate;
