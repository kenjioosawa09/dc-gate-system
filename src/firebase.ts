import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDNL-swh4g2pRUIqxQdlKeQDxSPuSs7Q8",
  authDomain: "dc-gate-system.firebaseapp.com",
  projectId: "dc-gate-system",
  storageBucket: "dc-gate-system.firebasestorage.app",
  messagingSenderId: "1026377164974",
  appId: "1:1026377164974:web:83658a3d873fcb688ea53f",
  measurementId: "G-QBFVZ4XJET"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);