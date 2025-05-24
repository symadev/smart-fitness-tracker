// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzoiKXtYmapYLzHGZLLysWjcTEMsxlcFI",
  authDomain: "smartfit-tracker.firebaseapp.com",
  projectId: "smartfit-tracker",
  storageBucket: "smartfit-tracker.firebasestorage.app",
  messagingSenderId: "436786707181",
  appId: "1:436786707181:web:6337a07a83939d95b22ae4"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);