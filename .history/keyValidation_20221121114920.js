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
  static async checkKey(APIkey) {
    // get user with specific api key
    var user = null;
    var status = false;
    await getData(APIkey);

    if (user.status > 0) {
      status = true;
    }

    return await status;
  }
}

module.exports = Validate;
