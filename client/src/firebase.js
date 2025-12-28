// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDco7WyT_LKqfVqckIUdlAX565LnYAl4PQ",
  authDomain: "skilllink-ai.firebaseapp.com",
  projectId: "skilllink-ai",
  storageBucket: "skilllink-ai.firebasestorage.app",
  messagingSenderId: "298852762132",
  appId: "1:298852762132:web:091d7287706af1ce465d01",
  measurementId: "G-645R9CTP0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
