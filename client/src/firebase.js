// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-c2cc3.firebaseapp.com',
  projectId: 'mern-blog-c2cc3',
  storageBucket: 'mern-blog-c2cc3.appspot.com',
  messagingSenderId: '893118753150',
  appId: '1:893118753150:web:1504ae42388e1722306b2f',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
