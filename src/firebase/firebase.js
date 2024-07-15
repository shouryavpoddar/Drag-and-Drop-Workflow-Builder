// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoQj_W37F96qM5UjJrHdeSDjDEyy7El0c",
  authDomain: "blockdata-4e11f.firebaseapp.com",
  projectId: "blockdata-4e11f",
  storageBucket: "blockdata-4e11f.appspot.com",
  messagingSenderId: "302074203261",
  appId: "1:302074203261:web:b1d717a93cefc432e5b514",
  measurementId: "G-MFEVL5ETJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth};
