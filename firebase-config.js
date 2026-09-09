// Import the Firebase functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgckgGHTUzWX22QLRePC80dViylbuYyy8",
  authDomain: "buzz-e921d.firebaseapp.com",
  projectId: "buzz-e921d",
  storageBucket: "buzz-e921d.firebasestorage.app",
  messagingSenderId: "377642650994",
  appId: "1:377642650994:web:2b7a532bfa23e46dcaa1eb",
  measurementId: "G-JHPZH5GM3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services and export them so other files can use them
export const auth = getAuth(app);
export const db = getFirestore(app);