// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmHz2SNd_9E321TNYSy6US-hkEGpB5CyE",
  authDomain: "notes-app-546e1.firebaseapp.com",
  projectId: "notes-app-546e1",
  storageBucket: "notes-app-546e1.appspot.com",
  messagingSenderId: "871935409799",
  appId: "1:871935409799:web:ea5ccb714e41218b80c222"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const notesCollection = collection(db, "notes")
