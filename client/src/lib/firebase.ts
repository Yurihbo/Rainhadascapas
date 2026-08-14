import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBJ8gUVMnkGcEuE7ALojxefTl6OD5iecKE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rainhadascapas-5a49a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rainhadascapas-5a49a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rainhadascapas-5a49a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "658528972318",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:658528972318:web:4f97f17f473f7a2469480f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1FN7PJ87JT",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
