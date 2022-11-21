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
  return (await db.collection("users").get()).forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

console.log(snapshot());

module.exports = snapshot;



