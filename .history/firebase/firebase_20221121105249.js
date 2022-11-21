var admin = require("firebase-admin");

var serviceAccount = require("./../serviceAction.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

let ref = db.collection("users");

ref.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.data());
  });
});
