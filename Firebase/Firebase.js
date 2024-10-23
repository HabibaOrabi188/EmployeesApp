import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Import Firebase Auth

// Firebase configuration (replace with your own config keys)
const firebaseConfig = {
  apiKey: "AIzaSyC5mO3aCos2AIHx7ob3NtKF6MGZiyB38Iw",
  authDomain: "employees-78e3e.firebaseapp.com",
  projectId: "employees-78e3e",
  storageBucket: "employees-78e3e.appspot.com",
  messagingSenderId: "835385420985",
  appId: "1:835385420985:web:98e28455eba014c007ff68",
  measurementId: "G-11PXVRVC6M"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };
