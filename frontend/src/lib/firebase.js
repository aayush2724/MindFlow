// Firebase configuration
// In production, replace with your actual Firebase project config
// The app uses mock data fallback if Firebase is not configured

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mindflow-demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mindflow-demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123:web:abc',
};

let app, auth, db, googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} catch (err) {
  console.warn('Firebase init failed — running in demo mode:', err.message);
}

export const DEMO_MODE = !import.meta.env.VITE_FIREBASE_API_KEY;

export { auth, db, googleProvider };
export default app;
