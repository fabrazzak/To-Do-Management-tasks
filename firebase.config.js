
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmQ-oGP7TUijgKXXlCDk8jxBPDpP0lg8M",
  authDomain: "to-do-967be.firebaseapp.com",
  projectId: "to-do-967be",
  storageBucket: "to-do-967be.firebasestorage.app",
  messagingSenderId: "192535460549",
  appId: "1:192535460549:web:e9aadc574388e39f3b4eac"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth