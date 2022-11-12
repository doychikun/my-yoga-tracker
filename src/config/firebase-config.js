// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD0aX4LgntVrfomwI3Nx4IuaNRDfZJqySs",
  authDomain: "fitness-tracker-app-f7bc9.firebaseapp.com",
  projectId: "fitness-tracker-app-f7bc9",
  storageBucket: "gs://fitness-tracker-app-f7bc9.appspot.com",
  messagingSenderId: "315024433273",
  appId: "1:315024433273:web:dc590c8633dc5ec66174a8",
  measurementId: "G-CRJMGPJMCL",
  databaseURL:
    "https://fitness-tracker-app-f7bc9-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// the Firebase authentication handler
export const auth = getAuth(app);

// the Realtime Database handler
export const db = getDatabase(app);

// the Firebase Storage handler
export const storage = getStorage(app);

// the Analytics handler
export const analytics = getAnalytics(app);
