import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, serverTimestamp, FieldValue } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi86VRMr2B0gCtYPYjX-BOYxIrB--q-fs",
  authDomain: "shopping-list-9d376.firebaseapp.com",
  projectId: "shopping-list-9d376",
  storageBucket: "shopping-list-9d376.appspot.com",
  messagingSenderId: "225035046170",
  appId: "1:225035046170:web:e8b86b122b36f515e570a3"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const timestamp = (): FieldValue => serverTimestamp();

export { app, db, auth, timestamp };