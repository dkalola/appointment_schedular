import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase with a "default" Firebase project
const defaultProject = initializeApp(firebaseConfig);

console.log(defaultProject.name); // "[DEFAULT]"

// Option 1: Access Firebase services via the defaultProject variable
let defaultStorage = getStorage(defaultProject);
let defaultFirestore = getFirestore(defaultProject);

// Option 2: Access Firebase services using shorthand notation
defaultStorage = getStorage();
defaultFirestore = getFirestore();

const firebaseConfig = {
  apiKey: "AIzaSyCWTrPtsXpI_kJf_JFtOkwCBllZpG2ffes",
  authDomain: "appointmentapi-7f945.firebaseapp.com",
  projectId: "appointmentapi-7f945",
  storageBucket: "appointmentapi-7f945.appspot.com",
  messagingSenderId: "970217794757",
  appId: "1:970217794757:web:5fd4975a214ec75c4a14ac",
};
