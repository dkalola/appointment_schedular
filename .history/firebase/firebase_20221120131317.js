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
const snapshot = async function (a, b) {
  await db.collection("users").get();
};

const snapshot = await db.collection("users").get();

snapshot.forEach((doc) => {
  console.log(doc.id, "=>", doc.data());
});



