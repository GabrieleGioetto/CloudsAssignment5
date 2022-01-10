// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaQtx64-_EzerzaKvoI1z6DekMEo2fscQ",
  authDomain: "assignmentclouds.firebaseapp.com",
  databaseURL: "https://assignmentclouds-default-rtdb.firebaseio.com",
  projectId: "assignmentclouds",
  storageBucket: "assignmentclouds.appspot.com",
  messagingSenderId: "384019960186",
  appId: "1:384019960186:web:b9abab7371b0e3b27646c3",
  measurementId: "G-75R6LX1NWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
