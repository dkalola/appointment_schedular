const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

// const users = db.collection("users");

const snapshot = db.collection("users").get();
snapshot.forEach((doc) => {
  console.log(doc.id, "=>", doc.data());
});

// module.exports = users;
