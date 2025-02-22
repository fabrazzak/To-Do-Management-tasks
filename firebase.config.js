
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMZIm4xfHIsFAzMdiE38HOIRLnqsjPOMA",
    authDomain: "to-do-management-96aca.firebaseapp.com",
    projectId: "to-do-management-96aca",
    storageBucket: "to-do-management-96aca.firebasestorage.app",
    messagingSenderId: "1025587631987",
    appId: "1:1025587631987:web:562b19c7a03c807abf9706"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth