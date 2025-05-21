
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOvIjQ-nAMaF-ug7aT9tOsVLfKwHwUGT8",
  authDomain: "admyreauth.firebaseapp.com",
  projectId: "admyreauth",
  storageBucket: "admyreauth.firebasestorage.app",
  messagingSenderId: "789225079164",
  appId: "1:789225079164:web:104a11e7c0d08fb22464f9",
  measurementId: "G-NY0FWREGHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
