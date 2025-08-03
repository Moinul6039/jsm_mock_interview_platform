import { initializeApp, getApp,getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSvwhp7ah8tWAE-XFemJJ0eX50zcFdqXM",
  authDomain: "prepwise-b924a.firebaseapp.com",
  projectId: "prepwise-b924a",
  storageBucket: "prepwise-b924a.firebasestorage.app",
  messagingSenderId: "651383472043",
  appId: "1:651383472043:web:7a648c9375909011d8dcee",
  measurementId: "G-9LPEY7QEJN"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);