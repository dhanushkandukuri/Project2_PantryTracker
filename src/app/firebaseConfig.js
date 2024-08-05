// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPzZ02XYwNRirynpr8QEfnEDr6AdcVCz4",
  authDomain: "pantrytracker-cc637.firebaseapp.com",
  projectId: "pantrytracker-cc637",
  storageBucket: "pantrytracker-cc637.appspot.com",
  messagingSenderId: "431280064561",
  appId: "1:431280064561:web:59476f0f057872810ead10"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
