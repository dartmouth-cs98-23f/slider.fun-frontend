// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// getStorage: accepts an application and tells Firebase we 
//are going to be using the storage of this application
import { getStorage } from 'firebase/storage';
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
  appId: "1:759073065844:web:93a66e972c4d280a9e7a21",
  measurementId: "G-ZGHT0Y9SHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// app refers to slider.fun application
// storage variables allows us to make references
// to which storage we are talking about. We need access to
// storage everywhere in our project, which is why
// it is being exported
export const storage = getStorage(app);