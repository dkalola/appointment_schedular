// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getFirestore } from "@firebase/firestore";
// import { getStorage } from "@firebase/storage";
// import { getAuth } from "firebase/auth";

const firebase = require("firebase");
const { generateApiKey } = require("generate-api-key");
const getFirestore = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const db = getFirestore(app);
// const auth = getAuth(app);

module.exports = db;
