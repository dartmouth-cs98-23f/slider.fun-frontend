// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4j7ZmdrkSE01GllzzmA3JAosWaw3AMb0",
  authDomain: "sliderdotfun-3af7a.firebaseapp.com",
  projectId: "sliderdotfun-3af7a",
  storageBucket: "sliderdotfun-3af7a.appspot.com",
  messagingSenderId: "759073065844",
  appId: "1:759073065844:web:acc94de45e5516ea9e7a21",
  measurementId: "G-S8LYBN7K37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);