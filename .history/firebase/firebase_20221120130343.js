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
const start = async function (a, b) {
  const result = await myfunction("test", "test");

  console.log(result);
};

