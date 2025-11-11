import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTOfihZqzlGEiUY2TpTPYCoMWgHgbIHJE",
  authDomain: "portverse-79ee6.firebaseapp.com",
  projectId: "portverse-79ee6",
  storageBucket: "portverse-79ee6.firebasestorage.app",
  messagingSenderId: "205944230261",
  appId: "1:205944230261:web:a1dbd87b6f828cf6db033c",
  measurementId: "G-E83VWWX7ZL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
