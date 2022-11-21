var admin = require("firebase-admin");

var serviceAccount = require("./../serviceAction.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

class FirebaseData {
  static setData(collection, data) {}
}

module.exports = FirebaseData;
