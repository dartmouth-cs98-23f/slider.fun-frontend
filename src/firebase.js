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
  apiKey: "AIzaSyAJcUcAhskoWU45qhbFAuhC1uaLehvj178",
  authDomain: "slider-fun.firebaseapp.com",
  projectId: "slider-fun",
  storageBucket: "slider-fun.firebasestorage.app",
  messagingSenderId: "495496918395",
  appId: "1:495496918395:web:2b4c62c0db67c8f94279de",
  measurementId: "G-4F4CVMW7NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// app refers to slider.fun application
// storage variables allows us to make references
// to which storage we are talking about. We need access to
// storage everywhere in our project, which is why
// it is being exported
export const storage = getStorage(app);