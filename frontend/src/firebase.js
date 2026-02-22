import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "FIREBASE_KEY",
    authDomain: "hehe-aefef.firebaseapp.com",
    projectId: "hehe-aefef",
    storageBucket: "hehe-aefef.firebasestorage.app",
    messagingSenderId: "30748121771",
    appId: "1:30748121771:web:1c16aa0077477a1bb8b5ee",
    measurementId: "G-HEPT8750G9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
