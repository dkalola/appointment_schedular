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

async function getData() {
  return db.collection("users").get();
}

// Start function
const snapshot = await getData();

module.exports = snapshot;



