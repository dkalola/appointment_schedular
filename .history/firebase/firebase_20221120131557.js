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

// Start function
const snapshot = async function () {
  await db.collection("users").get();
};

console.log(snapshot);

module.exports = snapshot;



