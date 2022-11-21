const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");
let userref = db.collection("users");

class Validate {
  static async getData(key) {
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
    var user = await Validate.getData(APIkey);
    var status = false;

    if (user.status > 0) {
      return user;
    }
  }
}

module.exports = Validate;
