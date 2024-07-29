// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7QwFSd7vzZmP2eTgrxhD0uxHW_9xaGFA",
  authDomain: "cprg306-assignments-3068b.firebaseapp.com",
  projectId: "cprg306-assignments-3068b",
  storageBucket: "cprg306-assignments-3068b.appspot.com",
  messagingSenderId: "1081491472010",
  appId: "1:1081491472010:web:6d6f01f5ac2a8b273bf773",
  measurementId: "G-4CG96NEFET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const analytics = getAnalytics(app);

export { auth };
