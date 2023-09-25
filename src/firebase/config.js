// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_VERCEL_API_KEY,
  authDomain: import.meta.env.VITE_VERCEL_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_VERCEL_PROJECT_ID,
  storageBucket: import.meta.env.VITE_VERCEL_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_VERCEL_MESSAGE_SENDER,
  appId: import.meta.env.VITE_VERCEL_APP_ID,
  measurementId: import.meta.env.VITE_VERCEL_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'pt-BR';

const database = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { app, database, storage, auth };
