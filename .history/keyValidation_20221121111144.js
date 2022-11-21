const db = require("./firebase/firebase.js");

let ref = db.collection("apiKeyMap");

class Validate {
  checkKey(key) {
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }
}
module.exports = ref;
