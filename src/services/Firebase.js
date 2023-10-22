// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD80n0HXfrC0FjI3E7uAFYUmTF4Ht8BBB4",
  authDomain: "txhackathon.firebaseapp.com",
  databaseURL: "https://txhackathon-default-rtdb.firebaseio.com",
  projectId: "txhackathon",
  storageBucket: "txhackathon.appspot.com",
  messagingSenderId: "404942557772",
  appId: "1:404942557772:web:9b0e2b88070d65273bdae9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };