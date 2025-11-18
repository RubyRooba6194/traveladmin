import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMGFWYitBrBOcAk8vrfWZVqlHXUZHTIxk",
  authDomain: "travel-admin-panel-87e55.firebaseapp.com",
  projectId: "travel-admin-panel-87e55",
  storageBucket: "travel-admin-panel-87e55.firebasestorage.app",
  messagingSenderId: "419883973815",
  appId: "1:419883973815:web:6a45d5b6942dec3a356132"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
