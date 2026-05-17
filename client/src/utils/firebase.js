import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interveiwplatform.firebaseapp.com",
  projectId: "interveiwplatform",
  storageBucket: "interveiwplatform.firebasestorage.app",
  messagingSenderId: "215527071178",
  appId: "1:215527071178:web:0739f829a420f309db4333"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };