import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq0lRANngAqAYp3FK3Eg9PLoc3NW1nP1U",
  authDomain: "connectpeople-f6f11.firebaseapp.com",
  projectId: "connectpeople-f6f11",
  storageBucket: "connectpeople-f6f11.appspot.com",
  messagingSenderId: "179587634729",
  appId: "1:179587634729:web:b7aca9725941e00105ae38",
  measurementId: "G-2ZERPVN5VM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
