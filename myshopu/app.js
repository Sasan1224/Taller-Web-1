// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYr3FXuwK2rydv5Y0A-5h-5HhXzxz-d_0",
  authDomain: "le-tiende.firebaseapp.com",
  projectId: "le-tiende",
  storageBucket: "le-tiende.appspot.com",
  messagingSenderId: "815737153738",
  appId: "1:815737153738:web:a791268871eecfe5de6c33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);