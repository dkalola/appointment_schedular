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
      const data = user.docs[0].data();
      if(data.)
      return true;
    }
  }
}

module.exports = Validate;
