// Firebase configuration
// Replace these values with your actual Firebase project configuration
export const firebaseConfig = {
  apiKey: "AIzaSyB9NfIWMTCz5RmRsdf4LMjdCNXv_n_waE8",
  authDomain: "exam-toan-8.firebaseapp.com",
  projectId: "exam-toan-8",
  storageBucket: "exam-toan-8.appspot.com",
  messagingSenderId: "859686455882",
  appId: "1:859686455882:web:9c485d866945ef02f374b3"
};

// Instructions for setup:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Enable Authentication with Google provider
// 4. Enable Firestore Database
// 5. Copy your config from Project Settings > General > Your apps
// 6. Replace the values above with your actual config

// Export db for use in other components
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Initialize Firebase app once and reuse across modules
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Connect to emulators in development (optional)
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }
