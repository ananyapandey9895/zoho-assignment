import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "hehe-aefef.firebaseapp.com",
  projectId: "hehe-aefef",
  storageBucket: "hehe-aefef.appspot.com",
  messagingSenderId: "30748121771",
  appId: "1:30748121771:web:0db6cd53747324a9b8b5ee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add prompt to select account
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider, signInWithPopup, signInWithRedirect };
