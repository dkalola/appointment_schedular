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


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWTrPtsXpI_kJf_JFtOkwCBllZpG2ffes",
  authDomain: "appointmentapi-7f945.firebaseapp.com",
  projectId: "appointmentapi-7f945",
  storageBucket: "appointmentapi-7f945.appspot.com",
  messagingSenderId: "970217794757",
  appId: "1:970217794757:web:5fd4975a214ec75c4a14ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function addData() {
  const docRef = db.collection("users").doc("alovelace");

  await docRef.set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
}

addData();
console.log("Data Added");
