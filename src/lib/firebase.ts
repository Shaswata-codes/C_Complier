import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvJ1NDdYf8KmXH0MDT46vA0ocrMTyMZY8",
  authDomain: "compiler-1ff17.firebaseapp.com",
  projectId: "compiler-1ff17",
  storageBucket: "compiler-1ff17.firebasestorage.app",
  messagingSenderId: "1063380182244",
  appId: "1:1063380182244:web:89dc8f8b036cb4dca338f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;