// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase config from Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyDdX6P4VA-H1Bb8nLJ3zx89HNE5009NpoU",
    authDomain: "image-upload-baeda.firebaseapp.com",
    projectId: "image-upload-baeda",
    storageBucket: "image-upload-baeda.appspot.com",
    messagingSenderId: "316044033397",
    appId: "1:316044033397:web:952c68b48bab5d9af8273c",
    measurementId: "G-S5GXR84YGG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
export const auth = getAuth(app);

// Set up Google provider
const googleProvider = new GoogleAuthProvider();

// Function to handle Google sign-in
export const signInWithGoogle = async () => {
  try {
    console.log('abhishek')
    const result = await signInWithPopup(auth, googleProvider);
    // The signed-in user info
    const user = result.user;
    console.log('User info:', user);
    return user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};
