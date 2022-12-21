const db = require("./firebase/firebase.js");

let userref = db.collection("users");

class Validate {
  static async getData(key) {
    var user = null;
    await userref
      .where("apiKey", "==", key)
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
    var user = await userref.where("apiKey", "==", APIkey).get();

    if (user.empty) {
      return false;
    } else {
      return true;
    }

    return user;
  }
}

module.exports = Validate;