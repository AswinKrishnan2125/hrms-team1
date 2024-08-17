// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Ensure this line is present
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOMhf7SJiBouOF9pn0p7QpWpEmuPY2BNE",
    authDomain: "hrms-69d51.firebaseapp.com",
    databaseURL: "https://hrms-69d51-default-rtdb.firebaseio.com",
    projectId: "hrms-69d51",
    storageBucket: "hrms-69d51.appspot.com",
    messagingSenderId: "407850379304",
    appId: "1:407850379304:web:f60af4d901fcd05fefed1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const storage = getStorage(app);
export { db,storage };