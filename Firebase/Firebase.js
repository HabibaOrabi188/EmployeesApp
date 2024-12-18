import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5mO3aCos2AIHx7ob3NtKF6MGZiyB38Iw",
  authDomain: "employees-78e3e.firebaseapp.com",
  projectId: "employees-78e3e",
  storageBucket: "employees-78e3e.appspot.com",
  messagingSenderId: "835385420985",
  appId: "1:835385420985:web:98e28455eba014c007ff68",
  measurementId: "G-11PXVRVC6M"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };
