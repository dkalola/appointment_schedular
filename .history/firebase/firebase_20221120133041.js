const fs = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyCWTrPtsXpI_kJf_JFtOkwCBllZpG2ffes",
  authDomain: "appointmentapi-7f945.firebaseapp.com",
  projectId: "appointmentapi-7f945",
  storageBucket: "appointmentapi-7f945.appspot.com",
  messagingSenderId: "970217794757",
  appId: "1:970217794757:web:5fd4975a214ec75c4a14ac",
};

fs.initializeApp(firebaseConfig);

const db = fs.firestore();

async function getData() {
  // get collection
  const users = await db.collection("users").get();

  // get document
  const liam = await db.collection("users").doc("liam").get();

  if (!liam.exists) {
    console.log("No document");
  } else {
    console.log(liam.data());
  }
}

getData();
