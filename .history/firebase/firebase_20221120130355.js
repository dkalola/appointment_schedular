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

const docRef = db.collection("users").doc("alovelace");

// Start function
const start = async function () {
  await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
};

start();

