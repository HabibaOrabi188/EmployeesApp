import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Firebase configuration (use your own config keys)
const firebaseConfig = {
  apiKey: "AIzaSyBkVaxSXJkT2-BfGUQ2m6C06dGfW4Kcg0o",
  authDomain: "employees-f5155.firebaseapp.com",
  databaseURL: "https://employees-f5155-default-rtdb.firebaseio.com",
  projectId: "employees-f5155",
  storageBucket: "employees-f5155.appspot.com",
  messagingSenderId: "134883143019",
  appId: "1:134883143019:web:1249e0532d8b7b4cd6b02e"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

// Export auth and db
export { db };
