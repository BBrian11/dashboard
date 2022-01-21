
import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/app' 
import 'firebase/database';
import "firebase/firestore";
import "firebase/storage";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'firebase/compat/auth';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyCgWTdoahNIQTenFMpfGUhrkNvEHhym-xE",
    authDomain: "pedidosreact.firebaseapp.com",
    projectId: "pedidosreact",
    storageBucket: "pedidosreact.appspot.com",
    messagingSenderId: "878564978793",
    appId: "1:878564978793:web:b2bc4d394ae87f56e572f8",
    measurementId: "G-TTF4GJNE8G"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth();
onAuthStateChanged(auth, user => {
  // Check for user status
});
const analytics = getAnalytics(app);