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
  return await db.collection("users").get();
}

console.log(getData());

// Start function





