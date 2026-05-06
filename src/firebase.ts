// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWV1lzkuL-UXsx9RTMGpucVD-Ki0pM6tI",
  authDomain: "expense-tracker-dfcfa.firebaseapp.com",
  projectId: "expense-tracker-dfcfa",
  storageBucket: "expense-tracker-dfcfa.firebasestorage.app",
  messagingSenderId: "367409243100",
  appId: "1:367409243100:web:00d5ce959d9314121fa519",
  measurementId: "G-NW6QCG338C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);